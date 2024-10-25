import { useMutation } from "@apollo/client";
import React, { FormEvent, useState } from "react";
import { CREATE_ALBUM } from "../mutations/mutation";
import { Button, Container, Form, Spinner } from "react-bootstrap";

const AlbumForm = () => {
  // ApolloClient's useMutation, works VERY similarly to useQuery for graphQL
  // the main difference, is we also get back a function that we can use to manually request data from our graphQL endpoint
  // [mutationFunction, {data, loading, etc}] = useMutation(YOUR_MUTATION)
  const [createAlbum, { data, loading }] = useMutation(CREATE_ALBUM);
  const [album, setAlbum] = useState('')


  if (loading) {
    return <Spinner />;
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    createAlbum({
        variables: {
            title: album,
            userId: "1"
        }
    })
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Album Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter album name"
            autoComplete="off"
            value={album}
            onChange={(event) => setAlbum(event.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      { data && (
        <>

            <h2>{data.createAlbum.title}</h2>
            <h3>by {data.createAlbum.user.name}</h3>
        </>)
      }
    </Container>
  );
};

export default AlbumForm;