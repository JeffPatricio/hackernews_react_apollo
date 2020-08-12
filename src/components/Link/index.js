import React from 'react';
import { Mutation } from 'react-apollo';
import { useAuth } from '../../hooks/AuthProvider';
import { VOTE_MUTATION } from '../../graphql/mutations';
import { timeDifferenceForDate } from '../../utils'
import { Container, ButtonVote, Index, ContainerContent, InfoLink } from './styles';

const Link = ({ index, link, updateStoreAfterVote }) => {

  const { authToken } = useAuth();

  return (
    <Container>
      <Index>{index + 1}.</Index>
      {
        authToken &&
        <Mutation
          mutation={VOTE_MUTATION}
          variables={{ linkId: link.id }}
          update={(store, { data: { vote } }) => (
            updateStoreAfterVote(store, vote, link.id)
          )}
          onError={data => alert(data.toString())}
        >
          {voteMutation => (
            <ButtonVote onClick={voteMutation} />
          )}
        </Mutation>
      }
      <ContainerContent>
        {link.description} ({link.url})
        <InfoLink>
          {link.votes.length} votes | by&nbsp;
          {link.postedBy ? link.postedBy.name : 'Unknown'}&nbsp;
          {timeDifferenceForDate(link.createdAt)}
        </InfoLink>
      </ContainerContent>
    </Container>
  );
}

export default Link;