import { useEffect, useState } from 'react';
import Link from 'next/link';
// styles
import { Flex } from '@/styles/common/direction';
import {
  Container,
  KakaoButton,
  LoginButton,
  SignupButton,
} from '../../styles/login/styles';

// icons
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { RiKakaoTalkFill } from 'react-icons/ri';

// types
import { userType } from '@/types/login';

// apis

// components
import Toast from '@/components/common/Toast';

// libraries
import { ToastStateType } from '@/types/home';
import usePostUserLogin from '@/hooks/login/api/usePostUserLogin';
import useGetFindUser from '@/hooks/login/api/useGetFindUser';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const Login = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  // toast boolean
  const [toastState, setToastState] = useState<ToastStateType>({
    state: false,
    stateText: '',
    stateCode: '',
  });
  const { state, stateText, stateCode } = toastState;
  // password show
  const [isShowed, setIsShowed] = useState<boolean>(false);
  // login data
  const [loginData, setLoginData] = useState<userType>({
    user_id: '',
    user_nickname: '',
    user_password: '',
  });

  const userIndex = isClient && localStorage.getItem('user_index');

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  // 로그인 함수
  function doLogin() {
    if (user_id.length > 0 && user_password.length > 0) {
      userLogins();
    }
  }

  // React Query
  const { mutate: userLogins } = usePostUserLogin({
    loginData,
    setToastState,
    handleToast,
  }); // 로그인

  const { mutate: findUser } = useGetFindUser({ userIndex }); // 유저 데이터 가져오기

  // 카카오 로그인
  async function kakaoLogin() {
    findUser();
  }

  // const myChat = useMutation({
  //   mutationKey: ['getMyChat'],
  //   mutationFn: async () => {
  //     const chat_user_id = 1;
  //     // const response = await getMyChat(chat_user_id);
  //     const response = await axios.get(
  //       `http://localhost:3000/api/chat/chatting`,
  //       {
  //         params: { chat_user_id },
  //       }
  //     );

  //     console.log(response);

  //     return response;
  //   },
  //   onError: (err) => {
  //     console.log(err);
  //   },
  // });

  // function getDat() {
  //   myChat.mutate();
  // }

  // useEffect(() => {
  //   getDat();
  // }, []);

  const getFriendRequest = useMutation({
    mutationKey: ['getMyChat'],
    mutationFn: async () => {
      const userID = 1;
      // const response = await getMyChat(chat_user_id);
      const response = await axios.get(`http://localhost:3000/api/friend`, {
        params: { userID },
      });

      console.log(response);

      return response;
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    getFriendRequest.mutate();
  }, []);

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
            <LoginButton onClick={() => userLogins()}>로그인</LoginButton>
            <Link data-testid="signup-link" href={'/signup'}>
              <SignupButton>회원가입</SignupButton>
            </Link>
          </div>
        </div>
        <KakaoButton onClick={kakaoLogin}>
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
