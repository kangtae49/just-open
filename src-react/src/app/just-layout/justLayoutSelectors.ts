import {useAppSelector} from "@/app/hooks.ts";
import type {RootState} from "@/app/store.ts";

export const selectJustLayout = (state: RootState) => state.justLayout;
export function useJustLayout() { return useAppSelector(selectJustLayout)}
