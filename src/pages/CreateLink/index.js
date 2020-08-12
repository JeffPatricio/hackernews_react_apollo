import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import Header from '../../components/Header';
import { FEED_QUERY } from '../../graphql/queries';
import { POST_MUTATION } from '../../graphql/mutations';
import { LINKS_PER_PAGE } from '../../config';
import { Container, Title, ContainerForm, Input, Button } from './styles';

const CreateLink = ({ location, history }) => {

  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  return (
    <Container>
      <Header location={location} />
      <Title>Submit new post</Title>
      <ContainerForm>
        <Input
          value={description}
          onChange={e => setDescription(e.target.value)}
          type="text"
          placeholder="A description for the link"
        />
        <Input
          value={url}
          onChange={e => setUrl(e.target.value)}
          type="text"
          placeholder="The URL for the link"
        />
      </ContainerForm>
      <Mutation
        mutation={POST_MUTATION}
        variables={{ description, url }}
        onCompleted={() => history.push('/news/1')}
        onError={data => alert(data.toString())}
        update={(store, { data: { post } }) => {
          const take = LINKS_PER_PAGE;
          const skip = 0;
          const orderBy = { createdAt: 'desc' };
          const data = store.readQuery({
            query: FEED_QUERY,
            variables: { take, skip, orderBy }
          });
          data.feed.links.unshift(post);
          store.writeQuery({
            query: FEED_QUERY,
            data,
            variables: { take, skip, orderBy }
          });
        }}
      >
        {(postMutation) => (
          <Button onClick={postMutation}>Submit</Button>
        )}
      </Mutation>
    </Container>
  );
}

export default CreateLink;