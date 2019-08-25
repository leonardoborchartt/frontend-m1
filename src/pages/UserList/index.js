import React, { useState, useEffect } from 'react';

import api from '../../services/api'
import { Link } from 'react-router-dom'
//import './index.css'

import Button from '@material-ui/core/Button';

export default function UserList({ history }) {
  const [users, setUsers] = useState([])

  async function deletarUsuario(user) {
    console.log(user.name);
    await api.delete(`/users/${user._id}`);
    history.go(); //refresh da pagina
  };


  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/users');

      setUsers(response.data);
    }
    loadUsers()

  }, []);




  return (
    <>
     <div>
      <Link to="/home"style={{textDecoration:'none'}}><Button >HOME</Button></Link>
    <p/>
      <Link to="/users/create"style={{textDecoration:'none'}}><Button>Criar Usuário</Button></Link>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Endereco</th>
            <th>Numero</th>
            <th>Cidade</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.address.street}</td>
              <td>{user.address.number}</td>
              <td>{user.city}</td>
              <td>
                <Link to={`/users/edit/${user._id}`} style={{textDecoration:'none'}}>Editar</Link>
                <button onClick={() => deletarUsuario(user)}> Deletar</button>
              </td>
            </tr>
          )

          )}
        </tbody>
      </table>
      </div>

    </>
  );
}
