import { UserType } from '@/types/UserType';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/global-slice';
import { getCycleStartTime, setCycleStartTime } from '@/services/tokenomics';

export default function useSaveUserLocal() {
  const dispatch = useAppDispatch();

  return function (user: UserType) {
    dispatch(setUser(user));

    // TODO: move logic to BE
    if (!getCycleStartTime()) {
      setCycleStartTime(new Date().getTime());
    }
  }
}
