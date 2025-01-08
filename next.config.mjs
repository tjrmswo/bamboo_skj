/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/socket/io', // 클라이언트 요청 경로
  //       destination: 'https://flchatserver.site/api/socket/io', // 실제 요청할 서버 주소
  //     },
  //   ];
  // },
};

export default nextConfig;
