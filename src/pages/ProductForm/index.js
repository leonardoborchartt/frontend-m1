import React, { useState, useEffect } from 'react';
import { Form, Input} from 'unform';

import { Link } from 'react-router-dom';

import api from '../../services/api'
// import { Container } from './styles';
import Button from '@material-ui/core/Button';


export default function ProductForm({ history, match }) { //esse histoy é so pra redirecionar o usuario, MATCH É PARA PEGAR O USUARIO
  const [data, setData] = useState({}); // esse data contem os campos do input


  async function handleSubmit(data) {
    await api.postOrPut('/produto',match.params.id, data); //na edicao tem id. na criacao nops
    history.push('/produto');
  };

  useEffect(() => {
    async function loadData() {
      const { id } = match.params;
      const response = await api.get(`/produto/${id}`);
      setData(response.data);
    }
    if (match.params.id) {
      loadData();
    }

  }, [match.params, match.params.id]); // esse vetor determina qaul inf o effect deve monitorar,se mudou id ele exec o useefft

  return (
    <>
      <Link to="/home"><Button variant="contained"> HOME</Button></Link> <p/>
      <Link to="/produto"><Button variant="contained" >Produto</Button></Link> <p/>
     
      <Form initialData={data} onSubmit={handleSubmit}>
      <Input  name="name" label="Nome" />
      <Input name="description" label="Descricao" />
      <Input name="value" label="valor" />
      <Button type="submit">Enviar</Button>
    </Form>
    </>
  );
}



