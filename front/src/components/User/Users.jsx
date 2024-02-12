import { useQuery, useMutation, gql } from "@apollo/client";
import { useState } from "react";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $name: String!
    $email: String!
    $password: String!
  ) {
    updateUser(id: $id, name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export default function Users() {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [addUser] = useMutation(ADD_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(form);
    if (!form.id) {
      await addUser({
        variables: {
          name: form.name,
          email: form.email,
          password: form.password,
        },
      });
    } else {
      await updateUser({
        variables: {
          id: form.id,
          name: form.name,
          email: form.email,
          password: form.password,
        },
      });
    }
    refetch();
    setForm({ id: "", name: "", email: "", password: "" });
  };

  // LOADING
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // console.log("fetch books", data);

  const handleEdit = (user) => {
    setForm(user);
  };

  const handleDelete = async (id) => {
    console.log(id, "userId");
    await deleteUser({ variables: { id } });
    refetch();
  };

  return (
    <div>
      <h1>Users</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="name"
          value={form.name}
          onChange={handleInputChange}
        />
        <input
          name="email"
          placeholder="email"
          type="email"
          value={form.email}
          onChange={handleInputChange}
        />
        <input
          name="password"
          placeholder="password"
          type="password"
          value={form.password}
          onChange={handleInputChange}
        />
        <button type="submit">{form.id ? "Update" : "Add"}</button>
      </form>

      <ul>
        {data &&
          data.users.map((user) => (
            <li key={user.id}>
              {user.id}, {user.name}, {user.email}
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
}
