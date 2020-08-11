import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-self: stretch;
  background-color: #ff6600;
  padding: 3px;
  align-items: center;

  a{
    text-decoration: none;
    color: #000;
    margin: 0 10px;
  }
`;

export const ContainerNavigation = styled.div`
  display: flex;
  flex: 1;
  align-items: center;

  h4{
    margin-right: 10px;
    cursor: pointer;
  }

  img{
    border: 1px solid #FFF;
    margin-right: 10px;
    cursor: pointer;
  }
`;

export const ContainerLogin = styled.div`
  display: flex;
`;

export const Separator = styled.div`
  &::after{
    content: '|'
  }
`;
