import { BoardType } from '@/types/home';
import { atom } from 'recoil';

export const selectedPost = atom<BoardType>({
  key: 'selectedPost',
  default: { Author: 0, id: '', content: '', image: '', date: '' },
});
