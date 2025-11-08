import { useDispatch, useSelector } from "react-redux";
import {type RootState, type AppDispatch, useInjectReducer} from "./index";
import type {Slice} from "@reduxjs/toolkit";
import {useMemo} from "react";

export const useAppDispatch: () => AppDispatch = useDispatch;

export function useAppSelector<T>(key: string): T | undefined {
  return useSelector((state: RootState) => (state as any)[key]);
}

export function useDynamicSlice<
  State extends Record<string, any>,
>(
  id: string,
  createSliceFn: (id: string) => Slice<State>
) {
  const slice = useMemo(() => createSliceFn(id), [id]);
  useInjectReducer(id, slice.reducer);
  const dispatch = useAppDispatch();
  const state = useAppSelector<State>(id)!;
  return {
    id,
    slice,
    actions: slice.actions,
    dispatch,
    state,
  };
}
