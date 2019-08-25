import React, { useState, useEffect } from 'react';

import api from '../../services/api'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
export default function CidadeList({ history }) {
  const [cidades, setCidades] = useState([])

  async function deletarCidade(cidades) {
    console.log(cidades.name);
    await api.delete(`/cidade/${cidades._id}`);
    history.go(); //refresh da pagina
  };


  useEffect(() => {
    async function loadCidades() {
      const response = await api.get('/cidade');
      setCidades(response.data);
    }
    loadCidades()

  }, []);



  return (
    <>
      <Link to="/home" style={{ textDecoration: 'none' }}><Button variant="contained">HOME</Button></Link>
      <p />
      <Link to="/cidade/create" style={{ textDecoration: 'none' }}>
        <Button >Criar Cidade</Button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
          </tr>
        </thead>
        {cidades.map(cidade => (
          <tr key={cidade._id}>
            <td>{cidade.name}</td>
            <Link to={`/cidade/edit/${cidade._id}`} style={{textDecoration:'none'}}
            ><Button >Editar</Button></Link>
            <Button onClick={() => deletarCidade(cidade)}> Deletar</Button>
          </tr>
        )

        )}
      </table>


    </>
  );
}
