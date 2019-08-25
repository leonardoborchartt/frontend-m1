import React, { useState, useEffect } from 'react';

import api from '../../services/api'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';
// import { Container } from './styles';

export default function ProductList({ history }) {
  const [product, setProducts] = useState([])

  async function deletarProduto(product) {
    console.log(product.name);
    await api.delete(`/produto/${product._id}`);
    history.go(); //refresh da pagina
  };


  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/produto');

      setProducts(response.data);
    }
    loadProducts()

  }, []);



  return (
    <>

      <Link to="/home"><Button>HOME</Button></Link>
    <p/>
      <Link to="/produto/create"><Button>Criar Produto</Button></Link>
      <p/>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descricao</th>
            <th>valor</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {product.map(produto => (
            <tr key={produto._id}>
              <td>{produto.name}</td>
              <td>{produto.description}</td>
              <td>{produto.value}</td>
              <td>
                <Link to={`/produto/edit/${produto._id}`}><Button>Editar</Button></Link>
                <Button onClick={() => deletarProduto(produto)}> Deletar</Button>
              </td>
            </tr>
          )

          )}
        </tbody>
      </table>


    </>
  );
}
