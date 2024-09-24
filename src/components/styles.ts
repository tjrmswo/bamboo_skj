import styled from 'styled-components';

export const ModalContainer = styled.div`
  width: 40vw;
  height: 60vh;
  background-color: white;
  border-radius: 0.2rem;
  position: absolute;
  top: 25%;
  right: 30%;
  z-index: 500;

  .modal {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .modalHeader {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-right: 0.3rem;
  }

  .logo {
  }
`;
