// eslint-disable-next-line no-restricted-imports
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import type { AppDispatch, RootState } from '.';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
