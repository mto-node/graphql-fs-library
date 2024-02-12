import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author {
        name
      }
    }
  }
`;

const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
    }
  }
`;

const ADD_BOOK = gql`
  mutation addBook($title: String!, $authorId: ID!) {
    addBook(title: $title, authorId: $authorId) {
      id
      title
      author {
        name
      }
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: String!, $authorId: ID!) {
    updateBook(id: $id, title: $title, authorId: $authorId) {
      id
      title
      author {
        name
      }
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

export default function Books() {
  // const { loading, error, data, refetch } = useQuery(GET_BOOKS);
  const {
    loading: booksLoading,
    error: booksError,
    data: booksData,
    refetch,
  } = useQuery(GET_BOOKS);

  const {
    loading: authorsLoading,
    error: authorsError,
    data: authorsData,
  } = useQuery(GET_AUTHORS);

  const [addBook] = useMutation(ADD_BOOK);
  const [updateBook] = useMutation(UPDATE_BOOK);
  const [deleteBook] = useMutation(DELETE_BOOK);

  const [form, setForm] = useState({
    id: "",
    title: "",
    author: "",
  });

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;
  if (booksLoading || authorsLoading) return <p>Loading...</p>;
  if (booksError || authorsError) return <p>Error fetching data...</p>;

  // console.log("fetch books", data);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.warn(form);
    if (!form.id) {
      await addBook({
        variables: { title: form.title, authorId: form.authorId },
      });
    } else {
      await updateBook({
        variables: { id: form.id, title: form.title, authorId: form.authorId },
      });
    }
    refetch();
    setForm({ id: "", title: "", authorId: "" });
  };

  const handleEdit = (book) => {
    setForm(book);
  };

  const handleDelete = async (id) => {
    await deleteBook({ variables: { id } });
    refetch();
  };

  // console.log("render");

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleInputChange}
        />

        <select
          name="authorId" // Assuming your form state has an "authorId" property
          value={form.authorId} // Assuming your form state has an "authorId" property
          onChange={handleInputChange} // Assuming you have a function to handle input change
        >
          <option value="">Select an author</option>
          {/* Add a default option */}
          {authorsData &&
            authorsData.authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
        </select>

        <button type="submit">{form.id ? "Update" : "Add"}</button>
      </form>

      <ul>
        {booksData &&
          booksData.books.map((book) => (
            <li key={book.id}>
              {book.title} by {book.author.name}
              <button onClick={() => handleEdit(book)}>Edit</button>
              <button onClick={() => handleDelete(book.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
}
