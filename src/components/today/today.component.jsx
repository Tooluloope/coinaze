import React, { Component } from 'react'
import './today.style.scss'

import { Container, Typography, Grid, Paper } from '@material-ui/core'
import axios from 'axios';





class Today extends Component {
    constructor(props) {
        super(props)
        this.state ={
            btcPrice:'',
            ltcPrice:'',
            ethPrice:'',
        };


    }

     componentDidMount() {

        if (!navigator.onLine) {
            this.setState({ btcPrice: localStorage.getItem('BTC') });
            this.setState({ ethPrice: localStorage.getItem('ETH') });
            this.setState({ ltcPrice: localStorage.getItem('LTC') });
        }
        setInterval( async ()=> {
             try {
                const response = await axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=NGN`);
                this.setState({
                    btcPrice: response.data.BTC.NGN,
                    ltcPrice: response.data.LTC.NGN,
                    ethPrice: response.data.ETH.NGN,
                })
                localStorage.setItem('BTC', response.data.BTC.NGN);
                localStorage.setItem('ETH', response.data.ETH.NGN);
                localStorage.setItem('LTC', response.data.LTC.NGN);
            } catch (error) {
                console.log(`Error: ${error.message}`)
            }
        }, 2000)
       

    }



    render() {
        const {btcPrice, ltcPrice, ethPrice } = this.state

        // debugger
        return ( 
            <Container className='mb-3'>
                <Grid container spacing={3}>
                <Grid item xs>
                    <Paper >
                        <Typography align='center' variant='h4' gutterBottom className = 'pt-2'>
                            {'\u20A6'}{btcPrice}

                        </Typography>
                        <Typography align='center' variant='body1' gutterBottom className ='pb-2' > 1 BTC </Typography>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper >
                        <Typography align='center' variant='h4' gutterBottom className = 'pt-2'>
                            {'\u20A6'}{ltcPrice}

                        </Typography>
                        <Typography align='center' variant='body1' gutterBottom className ='pb-2' > 1 LTC </Typography>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper >
                        <Typography align='center' variant='h4' gutterBottom className = 'pt-2'>
                            {'\u20A6'}{ethPrice}

                        </Typography>
                        <Typography align='center' variant='body1' gutterBottom  className ='pb-2'> 1 ETH </Typography>
                    </Paper>
                </Grid>
                

            </Grid>

            </Container>
            
        )
    }
};


export default Today;
