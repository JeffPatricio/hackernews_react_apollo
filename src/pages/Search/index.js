import React, { useState, useCallback } from 'react';
import { withApollo } from 'react-apollo';
import { FEED_SEARCH_QUERY } from '../../graphql/queries';
import Header from '../../components/Header';
import Link from '../../components/Link';
import { Container, ContainerSearch, Title, Button } from './styles';

const Search = ({ client, location }) => {

  const [links, setLinks] = useState([]);
  const [filter, setFilter] = useState('');
  const [fetching, setFetching] = useState(false);

  const executeSearch = useCallback(async () => {
    if (fetching) return;
    setFetching(true);
    const result = await client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter },
    });

    const links = result.data.feed.links;
    setLinks(links);
    setFetching(false);
  }, [filter]);

  return (
    <Container>
      <Header location={location} />
      <ContainerSearch>
        <Title>Search</Title>
        <input type='text' onChange={e => setFilter(e.target.value)} />
        <Button onClick={executeSearch}>OK</Button>
      </ContainerSearch>
      {
        !fetching && links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))
      }
      {
        fetching && 'Searching'
      }
    </Container>
  );
}

export default withApollo(Search);