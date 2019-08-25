import React, { useState, useEffect } from 'react';
import { Form, Input, Scope } from 'unform';

import { Link } from 'react-router-dom';
  
import api from '../../services/api';
import Button from '@material-ui/core/Button';
//import './index.css';




export default function UserForm({ history, match }) { //esse histoy é so pra redirecionar o usuario, MATCH É PARA PEGAR O USUARIO
  const [data, setData] = useState({}); // esse data contem os campos do input


  async function handleSubmit(data) {
    await api.postOrPut('/users',match.params.id, data); //na edicao tem id. na criacao nops
    history.push('/users');
  };

  useEffect(() => {
    async function loadData() {
      const { id } = match.params;
      const response = await api.get(`/users/${id}`);
      setData(response.data);
    }
    if (match.params.id) {
      loadData();
    }

  }, [match.params, match.params.id]); // esse vetor determina qaul inf o effect deve monitorar,se mudou id ele exec o useefft

  return (
    
    <>
    <div>
      <Link to="/home"><Button>HOME</Button></Link>
     <p/>
    <Link to="/users"><Button>Usuários</Button></Link> <p/>
    <Form initialData={data} onSubmit={handleSubmit}>
      <Input name="name" label="Nome" />
      <Scope path="address">
        <Input name="street" label="Rua" />
        <Input name="number" label="NR" />
      </Scope>

      <Input name="city" label="Cidade" />

      <Button  type="submit">Enviar</Button>
      
    </Form>
    </div>
    </>
  );
}



