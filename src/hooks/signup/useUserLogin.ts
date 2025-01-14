import { useRouter } from 'next/navigation';
import { SetStateAction } from 'react';

// apis
import { signup } from '@/pages/api/clients/signup';

// types
import { ToastStateType } from '@/types/home';

// libraries
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface useUserLoginType {
  user_id: string;
  user_password: string;
  user_nickname: string;
  university: string;
  setToastState: React.Dispatch<SetStateAction<ToastStateType>>;
  handleToast(): void;
}

const useUserLogin = ({
  user_id,
  user_password,
  user_nickname,
  university,
  setToastState,
  handleToast,
}: useUserLoginType) => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['signup'],
    mutationFn: async () => {
      const body = {
        user_id,
        user_password,
        user_nickname,
        university,
      };
      const response = await signup(body);

      console.log(response);

      if (response.status === 201) {
        setToastState((prev) => ({
          ...prev,
          stateCode: `${response.status}`,
          stateText: '회원가입 성공!',
        }));

        handleToast();
        setTimeout(() => {
          router.push('/login');
        }, 2510);
      }
    },
    onError(err: AxiosError) {
      console.log(err);
      if (err.status === 409) {
        setToastState((prev) => ({
          ...prev,
          stateCode: '409',
          stateText: '이미 존재하는 아이디입니다!',
        }));

        handleToast();
      }
    },
  });
};

export default useUserLogin;
