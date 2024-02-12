import { useQuery, useMutation, gql } from "@apollo/client";
import { useState } from "react";

const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
    }
  }
`;

const ADD_AUTHOR = gql`
  mutation addAuthor($name: String!) {
    addAuthor(name: $name) {
      id
      name
      email
    }
  }
`;

const UPDATE_AUTHOR = gql`
  mutation updateAuthor($id: ID!, $name: String!) {
    updateAuthor(id: $id, name: $name) {
      id
      name
    }
  }
`;

const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($id: ID!) {
    deleteAuthor(id: $id) {
      id
    }
  }
`;

export default function Authors() {
  const { loading, error, data, refetch } = useQuery(GET_AUTHORS);
  const [addAuthor] = useMutation(ADD_AUTHOR);
  const [updateAuthor] = useMutation(UPDATE_AUTHOR);
  const [deleteAuthor] = useMutation(DELETE_AUTHOR);

  const [form, setForm] = useState({
    id: "",
    name: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(form);
    if (!form.id) {
      await addAuthor({
        variables: {
          name: form.name,
        },
      });
    } else {
      await updateAuthor({
        variables: {
          id: form.id,
          name: form.name,
        },
      });
    }
    refetch();
    setForm({ id: "", name: "" });
  };

  // LOADING
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // console.log("fetch books", data);

  const handleEdit = (author) => {
    setForm(author);
  };

  const handleDelete = async (id) => {
    console.log(id, "authorId");
    await deleteAuthor({ variables: { id } });
    refetch();
  };

  return (
    <div>
      <h1>Authors</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="name"
          value={form.name}
          onChange={handleInputChange}
        />
        <button type="submit">{form.id ? "Update" : "Add"}</button>
      </form>

      <ul>
        {data &&
          data.authors.map((author) => (
            <li key={author.id}>
              {author.id}, {author.name}
              <button onClick={() => handleEdit(author)}>Edit</button>
              <button onClick={() => handleDelete(author.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
}
