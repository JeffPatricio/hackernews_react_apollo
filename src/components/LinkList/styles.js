import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #F6F6EF;
  padding: 10px;
`;

export const ContainerNav = styled.div`
  display: flex;
  padding: 20px 20px;
  
  div + div{
    margin-left: 10px;
  }
`;

export const ItemNav = styled.div`
  cursor: pointer;
`;
