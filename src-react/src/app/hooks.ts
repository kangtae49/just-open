import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;

export function useAppSelector<T>(key: string): T | undefined {
  return useSelector((state: RootState) => (state as any)[key]);
}