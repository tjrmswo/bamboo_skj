import Image from 'next/image';
import { useEffect, useState } from 'react';
// styles
import { Container, HomeHeader, HomeInput, Main, Nav } from '@/styles/styles';

// icons
import { IoSearch } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';

// libraries
import axios from 'axios';

// types
import { BoardType } from '@/types/home';

//constants
import { sortValues } from '@/constants/boardSortingValue';
import { useRecoilState } from 'recoil';
import { selectedPost } from '@/atom/state';

// compnents
import Modal from '@/components/Modal';

// hooks
import useModalOpen, { useModalOpenType } from '@/hooks/useModalOpen';

// img
import TestImg from '@/assets/images/campus.jpg';
import BoardDetail from '@/components/BoardDetail';

const Home = () => {
  const [selected, setSelected] = useRecoilState<BoardType>(selectedPost);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const [data, setData] = useState<BoardType[]>([
    {
      Author: 0,
      content: '',
      id: '',
      image: '',
      date: '',
    },
  ]);

  function getSelectedData(data: BoardType) {
    setSelected(data);
    setIsOpened(true);
  }

  function openModal() {
    const object: useModalOpenType = {
      isOpened,
      setIsOpened,
    };
    const execute = useModalOpen(object);
    execute();
  }

  async function getData() {
    try {
      const response = await axios.get('http://localhost:3001/posts');

      if (response.status === 200) {
        setData(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function sortingBoards(value: string) {
    console.log(value);
    switch (value) {
      case '최신순':
        const newArray = data.map((d) => {
          const time = new Date(d.date).toJSON();
          console.log(time);
          return;
        });
        console.log(newArray);
        break;
      case '오래된 순':
        break;
      case '이름순':
        break;
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log('data: ', data);
    console.log('selected data : ', selected);
  }, [data, selected]);

  return (
    <Container>
      <div id="modal-container"></div>
      {isOpened && <div className="background"> </div>}
      <HomeHeader>
        <span className="projectTitle">FrontLine</span>
        <HomeInput />
        <div className="headerContainer">
          <IoSearch size={25} className="search" />
          <FaUserCircle size={25} className="user" />
        </div>
      </HomeHeader>
      <div
        style={{
          width: '70%',
          boxShadow: '0px 1px 5px 4px #efefef',
          flexGrow: 1,
        }}
      >
        <Nav>
          <div></div>
          <div></div>
          <div></div>
          <select
            name="sortValue"
            id="sortValue"
            onChange={(e) => sortingBoards(e.target.value)}
          >
            {sortValues.map((v, i) => (
              <option className="sortButton" key={i} value={v}>
                {v}
              </option>
            ))}
          </select>
        </Nav>
        <Main>
          {data.map((d, i) => (
            <div
              className="boardContainer"
              key={i}
              onClick={() => getSelectedData(d)}
            >
              <div className="boardColumn">
                <div className="boardTitle">{d.id}</div>
                <span className="boardContent">{d.date}</span>
              </div>
            </div>
          ))}
        </Main>
        {isOpened === true && (
          <Modal openModal={openModal} modal={isOpened}>
            <div style={{ padding: '10px' }}>
              <div className="publisher">{selected.id}</div>
              <div className="date">{selected.date}</div>
              <div className="row">
                <div className="content">{selected.content}</div>
                <Image
                  src={TestImg}
                  style={{ borderRadius: '5px' }}
                  alt="이미지"
                  width={200}
                  height={200}
                  unoptimized={true}
                />
              </div>
            </div>
          </Modal>
        )}
      </div>
    </Container>
  );
};

export default Home;
