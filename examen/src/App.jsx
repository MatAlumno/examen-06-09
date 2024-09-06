import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [data, setData] = useState({"id": "", "name": "", "email": ""});
  const [currentPage, setCurrentPage] = useState(1);
  const users = 5;

  const changeData = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const changePosts = () => {
    axios
      .post("http://localhost:3000/posts", data )
      .then((response) => {
        console.log(response);
        getPosts();
      })
      .catch((error) => console.error("Error posting data:", error));
  };
  const getPosts = () => {
    axios
      .get("http://localhost:3000/posts")
      .then((response) => setPosts(response.data.posts))
      .catch((error) => console.error("Error fetching data:", error));
  };
  const deletePost = () => {
    axios
      .delete(`http://localhost:3000/posts/${ user.id }`)
      .then((response) => {
        console.log(response);
        getPosts();
      })
      .catch((error) => console.error("Error posting data:", error));
  };
  const changePost = () => {
    axios
      .patch(`http://localhost:3000/posts/${ user.id }`, data )
      .then((response) => {
        console.log(response);
        getPosts();
      })
      .catch((error) => console.error("Error posting data:", error));
  };
  const changeBusqueda = (event) => {
    setBusqueda(event.target.value)
  };
  useEffect(() => {
    getPosts();
  }, [changePosts]);

  /*
  const users = posts
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstUser, indexOfLastUser);

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };*/
  
  return (
    <>
      <h1>FORM</h1>
      <form onSubmit={changePosts}>
        <input type="text" name="id" value={data.id} onChange={changeData} placeholder="ID"/>
        <input type="text" name="name" value={data.name} onChange={changeData} placeholder="Nombre"/>
        <input type="email" name="email" value={data.email} onChange={changeData} placeholder="Mail"/>
        <button type="submit">Enviar</button>
      </form>

      <h1>BUSCAR</h1>
      <input type="text" name='busqueda' value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>


      <h1>TABLE</h1>
      <table>
        <tr>
          <th>ID</th>
          <th>NOMBRE</th>
          <th>EMAIL</th>
          <th>EDIT</th>
          <th>DELETE</th>
        </tr>
        <tbody>
          {posts.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={changePost} >Editar</button>
              </td>
              <td>
                <button onClick={deletePost} >Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <button
          onClick={nextPage}
          disabled={indexOfLastUser >= posts.length}
        >
          Siguiente
        </button>
      </div>
      
    </>
  );
}
export default App;
