import React from 'react';
import { Link } from 'react-router-dom'

//import './index.css'
import Button from '@material-ui/core/Button';


export default function PageHome({ history, match }) { //esse histoy é so pra redirecionar o usuario, MATCH É PARA PEGAR O USUARIO

    return (
        <>
            <Link to="/users"style={{textDecoration:'none'}}><Button variant="contained" >Cadastro Usuário</Button></Link> <p />
            <Link to="/produto"style={{textDecoration:'none'}}><Button variant="contained">Cadastro Produto</Button></Link><p />
            <Link to="/cidade"style={{textDecoration:'none'}}><Button variant="contained">Cadastro Cidade</Button></Link><p />
            <Link to="/venda"style={{textDecoration:'none'}}><Button variant="contained">VENDA</Button></Link>   <p />
        </>
    );
}

