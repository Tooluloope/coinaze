import React, { Fragment } from 'react';
import './App.css';
import History from './components/history/history.component';
import Today from './components/today/today.component';
import Header from './components/header/header.component';
import { Typography, Container } from '@material-ui/core';

function App() {
  return (

    <Fragment>
      <Header></Header>
      <Container>
          <Typography className='mt-3 line-height' variant='h4' align = 'center' >
              Coinaze is a realtime price information about
              <br/> 
              BITCOIN, ETHERIUM, LITECOIN
          </Typography>

      </Container>
      <Today></Today>

      <History></History>
    </Fragment>
  );
}

export default App;
