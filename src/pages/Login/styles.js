import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  padding: 10px 120px;
`;

export const Title = styled.h4`
  padding: 15px 0;
`;

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerButtons = styled.div`
  display: flex;
`;

export const Input = styled.input`
  display: flex;
  align-self: flex-start;
  margin-bottom: 10px;
  width: 300px;
`;

export const Separator = styled.div`
  &::after{
    content: '|'
  }
  margin: 0 5px;
`;

export const Button = styled.button`
`;
