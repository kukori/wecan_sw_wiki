import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  title: string;
}

const StyledHeader = styled.header`
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: space-around;
  background: #dedede;
`;

const Title = styled.div`
  font-weight: 500;
  line-height: 23px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHeaderLink = styled(Link)`
  font-weight: 400;
  font-size: 14px;
  text-decoration: none;
  color: #666666;
`;

export function Header({ title = '' }: Props) {
  return (
    <StyledHeader>
      <HeaderContainer>
        <Title>{title}</Title>
        <StyledHeaderLink to="/"> &#8629; Home</StyledHeaderLink>
      </HeaderContainer>
    </StyledHeader>
  );
}
