import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 20px;
  padding: 0 20px;
  min-width: 94px;
  height: 40px;
  font-size: 16px;
  background: #3c3c43;
  border: 1px solid #3c3c43;
  box-sizing: border-box;
  border-radius: 100px;
  color: #fff;
  &:hover {
    background: #fff;
    color: #3c3c43;
  }
  &:disabled {
    background: #dedede;
    color: #808080;
    border: 1px solid #808080;
  }
`;
