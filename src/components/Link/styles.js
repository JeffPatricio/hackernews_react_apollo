import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Index = styled.span`
  color: gray;
  margin-right: 5px;
`;

export const ContainerContent = styled.div`
`;

export const InfoLink = styled.p`
  display: flex;
  font-size: .875rem;
  color: #777;
  line-height: 1.5;
`;

export const ButtonVote = styled.div`
  &::after{
    content: '▲';
  }
`;
