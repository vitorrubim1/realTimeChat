import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; //PACKAGE OF ROUTES

import Login from '../src/pages/Login/Login'; //LOGIN 
import Chat from '../src/pages/Chat/Chat'; //Chat 

export default function Routes(){
    return(
        <BrowserRouter> 
            <Route path="/" exact component={Login} />
            <Route path="/chat" component={Chat} />
        </BrowserRouter>
    );
}