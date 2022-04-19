import styled, { keyframes } from 'styled-components';
// https://tobiasahlin.com/spinkit/

const rotate = keyframes`
 0% { 
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  } 50% { 
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  } 100% { 
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  background-color: #666666;

  margin: 100px auto;
  animation: ${rotate} 1.2s infinite ease-in-out;
`;
