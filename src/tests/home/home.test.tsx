import React from 'react';

// libraries
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import Cookie from 'js-cookie';

// pages
import Home from '@/pages/index';

// components
import Modal from '@/components/common/Modal';
import BoardInfo from '@/components/home/BoardInfo';

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

jest.mock('../../pages/api/clients/home');

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
  })),
}));

describe('Home Page', () => {
  const queryClient = new QueryClient();

  let createBtn: HTMLButtonElement;

  beforeEach(() => {
    (Cookie.get as jest.Mock).mockImplementation((key) => {
      switch (key) {
        case 'user_index':
          return '1';
        default:
          return null;
      }
    });

    const intersectionObserverMock = () => ({
      observe: () => null,
      unobserve: () => null,
    });
    window.IntersectionObserver = jest
      .fn()
      .mockImplementation(intersectionObserverMock);

    render(
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
      </RecoilRoot>
    );

    createBtn = screen.getByText('작성');
  });

  test('게시글 생성 테스트', async () => {
    fireEvent.click(createBtn);

    const boardTitle = screen.getByPlaceholderText('제목') as HTMLInputElement;
    const boardContent = screen.getByPlaceholderText(
      '글 내용 작성'
    ) as HTMLInputElement;
    const boardImg = screen.getByLabelText('이미지 업로드') as HTMLInputElement;
    const boardCompleteBtn = screen.getByText('작성 완료') as HTMLButtonElement;

    const file = new File(['dummy content'], 'campus.jpg', {
      type: 'image/jpeg',
    });

    await act(async () => {
      fireEvent.change(boardTitle, { target: { value: '제목 테스트' } });
      fireEvent.change(boardContent, { target: { value: '내용 테스트' } });
      fireEvent.change(boardImg, { target: { files: [file] } });
    });
    fireEvent.click(boardCompleteBtn);

    if (!boardImg.files) {
      return;
    }

    expect(boardTitle.value).toBe('제목 테스트');
    expect(boardContent.value).toBe('내용 테스트');
    expect(boardImg.files[0]).toEqual(file);
    expect(boardImg.files).toHaveLength(1);
  });

  test.only('게시글 수정 테스트', async () => {
    const file = new File(['dummy content'], 'campus.jpg', {
      type: 'image/jpeg',
    });

    const mockOpenModal = jest.fn();
    const mockHandleSelectedImg = jest.fn();
    const mockSetSelected = jest.fn();

    beforeEach(() =>
      render(
        <Modal modal={true} openModal={mockOpenModal} width={30} height={70}>
          <BoardInfo
            handleSelectedImg={mockHandleSelectedImg}
            setSelected={mockSetSelected}
          />
        </Modal>
      )
    );

    const boardElement = screen.getByLabelText('게시글선택');
    fireEvent.click(boardElement);

    const modifyBtn = screen.getByLabelText('게시글수정');

    await act(async () => {
      fireEvent.click(modifyBtn);
    });

    const modifyConfirmBtn = screen.getByLabelText('게시글수정확인');
    const titleInput = screen.getByLabelText('게시글 제목') as HTMLInputElement;
    const dateInput = screen.getByLabelText(
      '게시글 생성일'
    ) as HTMLInputElement;
    const contentInput = screen.getByLabelText(
      '게시글 내용'
    ) as HTMLInputElement;
    const fileInput = screen.getByLabelText(
      '이미지 업로드'
    ) as HTMLInputElement;

    fireEvent.change(titleInput, { target: { value: '제목 테스트' } });
    fireEvent.change(dateInput, { target: { value: '2024-9-26 14:20:51' } });
    fireEvent.change(contentInput, { target: { value: '테스트 테스트' } });
    fireEvent.change(fileInput, { target: { files: [file] } });

    const submitBtn = screen.getByLabelText('게시글수정확인');

    fireEvent.click(submitBtn);

    if (!fileInput.files) {
      return;
    }

    expect(titleInput.value).toBe('제목 테스트');
    expect(dateInput.value).toBe('2024-9-26 14:20:51');
    expect(contentInput.value).toBe('테스트 테스트');
    expect(fileInput.files?.[0]).toEqual(file);
    expect(fileInput.files).toHaveLength(1);

    await act(async () => {
      fireEvent.click(modifyConfirmBtn);
    });
  });

  test('게시글 삭제 테스트', async () => {
    const data = screen.getByLabelText('전체데이터');
    expect(data).toBeInTheDocument();

    await waitFor(() => {
      const deleteBtn = screen.getByText('삭제');
      fireEvent.click(deleteBtn);
    });
  });
});
