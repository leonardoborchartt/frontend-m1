import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import api from '../../services/api';
import './index.css';
import CarrinhoList from '../CarrinhoList/index'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';




const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: 850,
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    maxWidth: 850,
  },
}));

export default function VendaForm({ history }) { //esse history é so pra redirecionar o usuario, MATCH É PARA PEGAR O USUARIO
  const [product, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [cidades, setCidades] = useState([])
  const [carinhos, setCarinhos] = useState([])

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/produto');
      setProducts(response.data);
    }
    loadProducts()
  }, []);
  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/users');
      setUsers(response.data);
    }
    loadUsers()
  }, []);
  useEffect(() => {
    async function loadCidades() {
      const response = await api.get('/cidade');
      setCidades(response.data);
    }
    loadCidades()
  }, []);

  useEffect(() => {
    async function loadCarinhos() {
      const response = await api.get('/carrinho');
      setCarinhos(response.data);
    }
    loadCarinhos()
  }, []);

  function addClienteCidade(history) {
    const addClienteCidade = document.getElementById("cidade-nome");
    history.go('/venda');
    console.log(addClienteCidade.value);
  }
  async function adicionarProdutoCarrinho(produto, history) {
    console.log("Voce selecionou o produto " + produto.name);
    let elements = document.getElementById(`${produto.name}`);
    produto.quantidade = elements.value;
    console.log("uto " + elements.value);

    await api.post('/carrinho', produto); //na edicao tem id. na criacao nops
    history.go('/venda');
  }

  async function limparCarrinho(product, history) {
    //console.log("voce deletou o produto " + product.name + " com  " + product._id);
    console.log("yup ");
    await api.delete(`/carrinho2/`);
    history.go('/venda');

  };
  const classes = useStyles();


    return (

    <> <div className="testes" >
      <Link to="/home"><Button>HOME</Button></Link> <p />
      <TableHead>
        <TableRow>
          <TableCell align="left" size="xl">Cliente</TableCell>
        </TableRow>


        <TextField
          id="user-nome"   select
          label="  "
          value={users.name}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
        >
          {users.map(option => (
            <option key={option._id} >
              {option.name }
            </option>
          ))}
        </TextField>

        <TextField
          id="cidade-nome"   select
          label="  "
          value={cidades.name}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
        >
          {cidades.map(option => (
            <option key={option._id} >
              {option.name }
            </option>
          ))}
        </TextField>
        <p/><Button onClick={() => addClienteCidade(history)}>SEND</Button>


      </TableHead>

      <h3 >Selecione os produtos disponíveis abaixo:</h3>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Produto</TableCell>
                <TableCell >Quantidade (un))</TableCell>
                <TableCell >Valor R$</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.description}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    R$ {row.value}
                  </TableCell>
                  <TextField id={row.name} placeholder="QTD" 
                  type="number" defaultValue="1"
                  label="QUANTIDADE"
                  margin="normal"
                  />
                  <Button onClick={() => adicionarProdutoCarrinho(row, history)
                  }>ADD</Button>
                  
                </TableRow>
              ))}
              <TableBody>
                

                <TableCell component="th" scope="row">
                </TableCell>
              </TableBody>
            </TableBody>
          </Table>

          <h3>PRODUTOS ADICIONADOS NO CARRINHO DO CLIENTE </h3>

          <p /><Button variant="outlined" color="primary" onClick={() => limparCarrinho(null, history)}>LIMPAR CARRINHO </Button>
          <CarrinhoList />

          
 
        </Paper>
      </div>

    </div>

    </>
  );
}



