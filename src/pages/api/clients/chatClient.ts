import axios from 'axios';
import config from '@/config';

const chatClient = axios.create({
  baseURL: config.CHAT_URL,
  timeout: 5000,
});

export default chatClient;
