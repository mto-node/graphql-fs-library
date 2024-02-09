import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author {
        id
        name
      }
    }
  }
`;

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: String!, $author: String!) {
    updateBook(id: $id, title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

function BookList() {
  const { loading, error, data, refetch } = useQuery(GET_BOOKS);
  const [addBook] = useMutation(ADD_BOOK);
  const [updateBook] = useMutation(UPDATE_BOOK);
  const [deleteBook] = useMutation(DELETE_BOOK);

  const [form, setForm] = useState({
    id: "",
    title: "",
    author: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.id) {
      await addBook({ variables: { title: form.title, author: form.author } });
    } else {
      await updateBook({
        variables: { id: form.id, title: form.title, author: form.author },
      });
    }
    refetch();
    setForm({ id: "", title: "", author: "" });
  };

  const handleEdit = (book) => {
    setForm(book);
  };

  const handleDelete = async (id) => {
    await deleteBook({ variables: { id } });
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log("fetch books", data);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleInputChange}
        />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleInputChange}
        />
        <button type="submit">{form.id ? "Update" : "Add"}</button>
      </form>

      <ul>
        {data.books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
            <button onClick={() => handleEdit(book)}>Edit</button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
