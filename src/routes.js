import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';
import PageHome from './pages/PageHome';
import ProductList from './pages/ProductList';
import ProductForm from './pages/ProductForm';

import CidadeForm from './pages/CidadeForm';
import CidadeList from './pages/CidadeList';
import VendaForm from './pages/VendaForm';


export default function Routes() {
    return (
        
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={PageHome} /> 
    
                <Route path="/home" exact component={PageHome} />
                <Route path="/produto" exact component={ProductList} />
                <Route path="/produto/create"  component={ProductForm} />
                <Route path="/produto/edit/:id"  component={ProductForm} />
                
                <Route path="/users" exact component={UserList} />
                <Route path="/users/create" component={UserForm} />
                <Route path="/users/edit/:id" component={UserForm} />
                
                <Route path="/cidade" exact component={CidadeList} />
                <Route path="/cidade/create" component={CidadeForm} />
                <Route path="/cidade/edit/:id" component={CidadeForm} />

                
                <Route path="/venda" exact component={VendaForm} />
            </Switch>
        </BrowserRouter>
    )
}