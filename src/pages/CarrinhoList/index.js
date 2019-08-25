import React, { useState, useEffect } from 'react';



import api from '../../services/api'



import Button from '@material-ui/core/Button';


import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pdf from "react-to-pdf";

const useStyles = makeStyles(theme => ({
    root: {
        width: '80%',
    },
    paper: {
        marginTop: theme.spacing(3),
        maxwidth: 1000,
        overflowX: 'auto',
        marginBottom: theme.spacing(2),
    },
    table: {
        maxWidth: 1000,
    },
    button: {
        margin: theme.spacing(2),

    },
}));
const ref = React.createRef(); // cria referencia para o create PDF



export default function CarrinhoList({ history }) {
    // const valorTotal=0;
    // const sum =0;
    const [carrinhos, setCarrinho] = useState([])
    useEffect(() => {
        async function loadCarrinhos() {
            const response = await api.get('/carrinho');
            setCarrinho(response.data);

        }
        loadCarrinhos();

    }, []);

    const somaTotalQtdProdutos = carrinhos.reduce(function (prevVal, elem) { // funcao soma TOTAL
        console.log("valor 1: " + prevVal + " valor 2 " + elem.value);
        return prevVal + elem.value * elem.quantidade;
    }, 0);
    console.log(somaTotalQtdProdutos);

    const classes2 = useStyles();
    //SEGUNDOO 222222222

    return (
        <>
                <Table  ref={ref} className={classes2.table} >
                    <TableHead> 
                        <TableRow>
                            <TableCell>Produto</TableCell>
                            <TableCell >Quantidade (un))</TableCell>
                            <TableCell >Valor R$</TableCell>
                            <TableCell >Total (Parcial)  </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {carrinhos.map(row => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.quantidade}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    R$ {row.value}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    R$ {row.value * row.quantidade}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableBody>
                            <TableCell component="th" scope="row">
                                TOTAL
            </TableCell>
                            <TableCell component="th" scope="row">
                                R$ {somaTotalQtdProdutos}
                            </TableCell>
                        </TableBody>
                    </TableBody>
                </Table>
      
                <Pdf targetRef={ref} filename="code-example.pdf">
                    {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
                </Pdf>
                
            



        </>
    );
}
