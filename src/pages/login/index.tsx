import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// styles
import { Flex } from '@/styles/common/direction';
import { Container, KakaoButton, LoginButton, SignupButton } from './styles';

// icons
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { RiKakaoTalkFill } from 'react-icons/ri';

// types
import { userType } from '@/types/login';
import { useMutation } from '@tanstack/react-query';

// apis
import { login } from '../api/clients/login';
import Link from 'next/link';

// components
import Toast from '@/components/common/Toast';

// libraries
import Cookie from 'js-cookie';
import { ToastStateType } from '@/types/home';

const Login = () => {
  // toast boolean
  const [toastState, setToastState] = useState<ToastStateType>({
    state: false,
    stateText: '',
    stateCode: '',
  });
  const { state, stateText, stateCode } = toastState;
  // router
  const router = useRouter();
  // password show
  const [isShowed, setIsShowed] = useState<boolean>(false);
  // login data
  const [loginData, setLoginData] = useState<userType>({
    user_id: '',
    user_password: '',
  });

  const { user_id, user_password } = loginData;

  function handlePwd() {
    setIsShowed(!isShowed);
  }

  function handleToast() {
    setToastState((prev) => ({
      ...prev,
      state: true,
    }));
    setTimeout(() => {
      setToastState((prev) => ({
        ...prev,
        state: false,
      }));
    }, 2500);
  }

  function handleLoginDate(sort: string, value: string) {
    setLoginData((prev) => ({
      ...prev,
      [sort]: value,
    }));
  }

  function doLogin() {
    if (user_id.length > 0 && user_password.length > 0) {
      userLogin.mutate();
    }
  }

  const userLogin = useMutation({
    mutationKey: ['login'],
    mutationFn: async () => {
      const response = await login(loginData);

      console.log(response);

      if (response.status === 200) {
        Cookie.set('token', response.data.token);
        Cookie.set('user_index', response.data.data.user_index);
        router.push('/');
      }

      return response.data;
    },

    // 타입 지정 알아보기
    onError(err: any) {
      console.log(err);
      setToastState((prev) => ({
        ...prev,
        stateText: `${err.response.data.message}`,
        stateCode: `${err.status}`,
      }));

      handleToast();
    },
  });

  useEffect(() => {
    console.log('loginData: ', loginData);
    console.log('toastState: ', toastState);
  }, [loginData, toastState]);
  return (
    <>
      <div id="toast_message"></div>
      {state && (
        <Toast stateCode={stateCode}>
          <div>{stateText}</div>
        </Toast>
      )}

      <Container>
        <div
          style={{
            ...Flex,
            flexDirection: 'column',
            height: '50%',
            justifyContent: 'space-between',
            transform: 'translateY(-10%)',
          }}
        >
          <h2>FrontLine</h2>

          <div style={{ ...Flex, flexDirection: 'column', gap: '10px' }}>
            <div className="inputContainer">
              <input
                type="text"
                placeholder="ID"
                onChange={(e) => handleLoginDate('user_id', e.target.value)}
              />
            </div>

            <div className="inputContainer">
              <input
                type={isShowed ? 'text' : 'password'}
                placeholder="Password"
                onChange={(e) =>
                  handleLoginDate('user_password', e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.code === 'Enter') {
                    doLogin();
                  }
                }}
              />

              {isShowed ? (
                <FaEyeSlash
                  style={{ marginRight: '0.2rem' }}
                  onClick={handlePwd}
                />
              ) : (
                <FaEye style={{ marginRight: '0.2rem' }} onClick={handlePwd} />
              )}
            </div>
          </div>

          <div
            style={{
              ...Flex,
              flexDirection: 'column',
              marginTop: '1rem',
              gap: '8px',
            }}
          >
            <LoginButton onClick={() => userLogin.mutate()}>로그인</LoginButton>
            <Link href={'/signup'}>
              <SignupButton>회원가입</SignupButton>
            </Link>
          </div>
        </div>
        <KakaoButton>
          <div className="btn">
            <RiKakaoTalkFill size={36} fill="#000000" />
          </div>

          <span className="loginText">카카오 로그인</span>
          <span></span>
          <span></span>
        </KakaoButton>
      </Container>
    </>
  );
};

export default Login;