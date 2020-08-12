import React, { useCallback } from 'react';
import { Query } from 'react-apollo';
import { LINKS_PER_PAGE } from '../../config';
import { FEED_QUERY } from '../../graphql/queries';
import { NEW_LINKS_SUBSCRIPTION, NEW_VOTES_SUBSCRIPTION } from '../../graphql/subscriptions';
import Link from '../Link';
import { Container, ContainerNav, ItemNav } from './styles';

const LinkList = ({ location, match, history }) => {

  const getQueryVariables = useCallback(() => {
    const isNewPage = location.pathname.includes('news');
    const page = parseInt(match.params.page, 10);
    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    const take = isNewPage ? LINKS_PER_PAGE : 100;
    const orderBy = isNewPage ? { createdAt: 'desc' } : null;
    return { take, skip, orderBy };
  }, [location, match]);

  const subscribeToNewLinks = useCallback(async (subscribeToMore) => {
    subscribeToMore({
      document: NEW_LINKS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newLink = subscriptionData.data.newLink;
        const exists = prev.feed.links.find(({ id }) => id === newLink.id);
        if (exists) return prev;

        return Object.assign({}, prev, {
          feed: {
            links: [newLink, ...prev.feed.links],
            count: prev.feed.links.length + 1,
            __typename: prev.feed.__typename
          }
        });
      }
    })
  }, []);

  const subscribeToNewVotes = useCallback((subscribeToMore) => {
    subscribeToMore({
      document: NEW_VOTES_SUBSCRIPTION
    });
  }, []);

  const getLinksToRender = useCallback((data) => {
    const isNewPage = location.pathname.includes('news');
    if (isNewPage) return data.feed.links;
    const rankedLinks = data.feed.links.slice();
    rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);
    return rankedLinks;
  }, [location]);

  const updateCacheAfterVote = useCallback((store, createVote, linkId) => {
    const isNewPage = location.pathname.includes('news');
    const page = parseInt(match.params.page, 10);
    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    const take = isNewPage ? LINKS_PER_PAGE : 100;
    const orderBy = isNewPage ? { createdAt: 'desc' } : null;
    const data = store.readQuery({
      query: FEED_QUERY,
      variables: { take, skip, orderBy }
    });
    const votedLink = data.feed.links.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;
    store.writeQuery({ query: FEED_QUERY, data });
  }, [location, match]);

  const nextPage = useCallback((data) => {
    const page = parseInt(match.params.page, 10);
    if (page <= data.feed.count / LINKS_PER_PAGE) history.push(`/news/${page + 1}`);
  }, [match]);

  const previousPage = useCallback(() => {
    const page = parseInt(match.params.page, 10);
    if (page > 1) history.push(`/news/${page - 1}`);
  }, [match, history]);

  return (
    <Query query={FEED_QUERY} variables={getQueryVariables()}>
      {({ loading, error, data, subscribeToMore }) => {

        if (loading) return <div>Fetching</div>
        if (error) return <div>Error</div>

        subscribeToNewLinks(subscribeToMore);
        subscribeToNewVotes(subscribeToMore);

        const linksToRender = getLinksToRender(data);
        const isNewPage = location.pathname.includes('news');
        const pageIndex = match.params.page ? (match.params.page - 1) * LINKS_PER_PAGE : 0;

        return (
          <Container>
            {
              linksToRender.map((link, index) => (
                <Link
                  key={link.id}
                  link={link}
                  index={index + pageIndex}
                  updateStoreAfterVote={updateCacheAfterVote}
                />
              ))
            }
            {
              isNewPage &&
              <ContainerNav>
                <ItemNav onClick={previousPage}>
                  Previous
                  </ItemNav>
                <ItemNav onClick={() => nextPage(data)}>
                  Next
                </ItemNav>
              </ContainerNav>
            }
          </Container>
        )
      }}
    </Query>
  );
}

export default LinkList;