# 🎋대학교 대나무숲

Socket.io 기반 실시간 채팅과 Jest 단위 테스트를 적용한 대학교 커뮤니티 서비스
1인 개발 · 현직 개발자 멘토링 활동(FrontLine) 참여 중 진행한 개인 프로젝트

대학교 학생들이 익명으로 소통하고, 게시글·친구·실시간 채팅으로 커뮤니케이션할 수 있는 커뮤니티 서비스입니다.

## 💻 UI

페이지 가져오기
| 로그인 | 회원가입 |
| :---: | :----: |
| ![image](https://github.com/user-attachments/assets/be4607b9-55d1-45bc-8be2-d3cdc36a4ddf) | ![image](https://github.com/user-attachments/assets/d4906685-2011-4a0d-8646-7fceb78ddde7)
| 게시글-작성 | 게시글-수정 |
![image](https://github.com/user-attachments/assets/cb6f811f-516f-42a1-a02a-b01d18d6caba) | ![image](https://github.com/user-attachments/assets/ad5b165e-d449-461e-b314-014bb6ed938d)
| 채팅 가능한 친구 목록 | 개별 채팅 뷰 |
![image](https://github.com/user-attachments/assets/38367653-85cd-45cf-8170-49d4f25abcd2) | ![image](https://github.com/user-attachments/assets/800c9e9f-c18a-4d62-8f8c-621fd99783a2)
| 친구 리스트 | 전체 유저 리스트 |
| ![image](https://github.com/user-attachments/assets/2f9fa9c6-7f4b-408d-912b-5d28edb08123) | ![image](https://github.com/user-attachments/assets/fe80e25d-4b02-4310-898c-42592cfc23f8)
| 받은 친구 요청|
| ![image](https://github.com/user-attachments/assets/ef09809f-03fa-4cfc-8175-cb5a567ed3c6) |





## 🛠 주요 기능

### 게시글 기능

- 게시글 조회, 생성, 수정, 삭제

### 채팅 기능

- Socket.io 기반 1:1 실시간 채팅
- 친구 목록에서 채팅방 진입, 실시간 메시지 송수신

### 친구 기능
- 친구 요청 / 수락
- 전체 유저 리스트, 받은 친구 요청 관리

🚀 시작하기

```bash
# 의존성 설치
pnpm install

# 목 API 서버 실행 (포트 3001)
json-server --watch db.json --port 3001

# 개발 서버 실행
pnpm dev
```


## 🌍 개발 환경

- node: v20.10.0
- pnpm: 9.12.3
- next: 14.2.13
- typescript: ^5.6.3
- react: ^18.3.1
- jest: ^29.7.0

## ⚒ Tech Stack

### Frontend

|                                                                       Next.js                                                                       |                                                              Typescript                                                              |                                                                                                                               Styled-components                                                                                                                                |                                                               Recoil                                                               |                                                                         Axios                                                                          |
| :-------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------: |
|   <img alt="NextJS" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwqsJpxyle5L9PwXST_rmofMHmA7HEXA30fw&s" width="65" height="65" />    |               <img src="https://techstack-generator.vercel.app/ts-icon.svg" alt="Typecript" width="65" height="65" />                |                                                                                         <img src="https://i.ibb.co/ydkG6cv/img.png" alt="Styled-components" width="65" height="65" />                                                                                          | <img src="https://github.com/user-attachments/assets/1befdeb7-1f1c-4340-8069-a078a648cc65" alt="Recoil" width="100" height="65" /> | <img src="https://user-images.githubusercontent.com/45915619/233941806-5d6d2a03-3b82-4267-8966-2eb8b32c9ba0.png" alt="Axios" width="65" height="65" /> |
|                                                                   TanStack Query                                                                    |                                                              Socket-io                                                               |                                                                                                                                      MSW                                                                                                                                       |                                                                jest                                                                |                                                                         husky                                                                          |
| <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR6cDwwea5Cf865N8HQYn7J42_QiilcOj9Ug&s" alt="ReactQuery" width="100" height="80" /> | <img src="https://github.com/user-attachments/assets/76848933-729a-42d5-b261-02d8be8637c8" alt="Socket-io" width="60" height="60" /> | <img src="https://images-ext-1.discordapp.net/external/_SNjjSQBJ0oxZ8JnMA96SBWi--B3Y0u2kYakiURqtaI/https/seeklogo.com/images/M/msw-mock-service-worker-logo-88A2A26653-seeklogo.com.png?format=webp&quality=lossless&width=373&height=375" alt="MSW" width="60" height="60" /> |  <img src="https://github.com/user-attachments/assets/696f7fd0-1d61-4751-bb2d-c0b0ed28ea23" alt="jest" width="65" height="65" />   |            <img src="https://github.com/user-attachments/assets/414f970b-4bca-4c61-9bb3-b879284c725c" alt="husky" width="65" height="65" />            |

### Backend

|JsonWebToken|Next.js Api Route| Express.js |
| :----: | :----: |:----:|
| <img src="https://github.com/user-attachments/assets/3287e94f-0acb-4eed-8c4e-d3d304549ae9" alt="MSW" width="60" height="60" /> | <img src="https://github.com/user-attachments/assets/15aeb411-7141-400f-8575-b83d4d79fcb5" alt="Next.jsapi route" width="150" height="80" /> | <img src="https://github.com/user-attachments/assets/626f1a73-1458-4928-9e83-4ef323f46cee" alt="Next.jsapi route" width="150" height="80" /> |


### DevOps

|AWS EC2| AWS LightSail | Route 53 |  NGINX |
| :----: | :----: | :----: | :----: |
| <img alt="EC2" src="https://github.com/user-attachments/assets/009af56c-3409-4a39-b9d8-f17ae3866620" width="65" height="65" /> | <img src="https://github.com/user-attachments/assets/b5c9d713-916b-4f93-a25c-2bb090f641d8" alt="AWS LightSail" width="65" height="65" /> |  <img src="https://github.com/user-attachments/assets/b4608021-a772-489d-a386-acb825b41122" alt="Route 53" width="65" height="65" /> | <img src="https://github.com/user-attachments/assets/6f2b5b90-7db0-4f4f-8804-8a8db61c6cb2" alt="NGINX" width="65" height="65" /> |

![image])


## 💡 System Architecture

![시스템 아키텍처](https://github.com/user-attachments/assets/2097003f-5556-42c9-8a82-202a8891ab59)


## 🔧 트러블슈팅

### 1. 한글 입력 시 채팅 메시지가 두 번 전송되는 문제

채팅 입력창에서 Enter로 메시지를 보낼 때, 한글 입력에서만 동일 메시지가 두 번 전송되는 현상이 발생했다.

처음에는 `handleKeyDown` 로직을 JSX 인라인에서 별도 함수로 분리하면 해결되는 것처럼 보였으나, 실제로는 재현되어 근본 원인이 아님을 확인했다.

원인은 한글의 **조합형 입력(IME)** 특성이었다. 한글은 조합 과정에서 `keydown` 이벤트가 추가로 트리거되어, 조합이 끝나기 전에 전송 로직이 한 번 더 실행되고 있었다. `compositionstart` / `compositionend` 이벤트로 조합 상태(`isComposing`)를 추적하고, 조합 중이 아닐 때만 전송되도록 수정해 해결했다.

```tsx
const [isComposing, setIsComposing] = useState(false);

const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
    e.preventDefault();
    sendMessages();
  }
};
// onCompositionStart / onCompositionEnd 로 isComposing 갱신
```

> "함수 분리로 해결된 듯 보였지만 재현됐고, 결국 IME 조합 이벤트가 진짜 원인이었다"는 점에서, 증상이 아니라 원인을 추적하는 과정을 경험했다.

### 2. EC2 배포 중 빌드 실패 및 소켓 연결 문제

배포 환경(EC2)에서 `pnpm build`가 중단되는 문제가 있었다. t2.micro의 제한된 메모리·CPU가 번들링/최적화 같은 자원 집약적 빌드 작업을 감당하지 못한 것이 원인으로, **t2.medium(2 vCPU / 4GiB)** 으로 변경해 해결했다.

이후 배포 환경에서 소켓이 연결되지 않는 문제는, 채팅 서버의 **CORS 설정**과 프론트엔드 **HTTPS(EC2 + NGINX)** 적용으로 해결했다. Socket.io 서버에 `path`를 명시하고 허용 origin을 환경변수로 분리했다.

```ts
const io = new Server(server, {
  path: '/api/socket/io',
  cors: {
    origin: [process.env.DEPLOY_ADDRESS, process.env.BE_DEPLOY_ADDRESS],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
```

