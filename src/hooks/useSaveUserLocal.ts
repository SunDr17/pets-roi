import { UserType } from '@/types/UserType';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/global-slice';

export default function useSaveUserLocal() {
  const dispatch = useAppDispatch();

  return function (user: UserType) {
    dispatch(setUser(user));
  }
}
