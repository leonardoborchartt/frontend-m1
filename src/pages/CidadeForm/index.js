import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'unform';

import { Link } from 'react-router-dom';

import api from '../../services/api';
// import { Container } from './styles';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';


const schema = Yup.object().shape({
    name:Yup.string().required("Cidade não pode ser em branco")
});


export default function CidadeForm({ history, match }) { //esse histoy é so pra redirecionar o usuario, MATCH É PARA PEGAR O USUARIO
  const [data, setData] = useState({}); // esse data contem os campos do input


  async function handleSubmit(data) {
    await api.postOrPut('/cidade',match.params.id, data); //na edicao tem id. na criacao nops
    history.push('/cidade');
  };

  useEffect(() => {
    async function loadData() {
      const { id } = match.params;
      const response = await api.get(`/cidade/${id}`);
      setData(response.data);
    }
    if (match.params.id) {
      loadData();
    }

  }, [match.params, match.params.id]); // esse vetor determina qaul inf o effect deve monitorar,se mudou id ele exec o useefft



  return (
    <>
    <Link to="/home" style={{textDecoration:'none'}}><Button variant="contained">HOME</Button></Link> <p/>
    <Link to="/cidade" style={{textDecoration:'none'}}><Button variant="contained">Cidade</Button></Link> <p/>

    <Form schema={schema}  initialData={data} onSubmit={handleSubmit} required>
      <Input name="name" label="Nome" />  
      <Button type="submit">Enviar</Button>
    </Form>
   
 




    </>
  );
}



