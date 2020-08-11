import React from 'react';
import Header from '../../components/Header';
import LinkList from '../../components/LinkList/';
import { Container } from './styles';

const News = (props) => {
  return (
    <Container>
      <Header />
      <LinkList {...props} />
    </Container>
  );
}

export default News;