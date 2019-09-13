import React, { Component } from 'react';
import './history.style.scss';
import axios from 'axios';
import moment from 'moment';
import {Box} from './box.component'

export default class History extends Component {
    constructor(props) {
        super(props)
        this.state ={
            todayPrice:0,
            oneDayPrice:0,
            twoDaysPrice:0,
            threeDaysPrice:0,
            fourDaysPrice:0,
            fiveDaysPrice:0,
            error:''
        }
    }

    getBTCPrices = async (date) => {
        const response = await axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=NGN&ts=${date}`);
        return response
        
    };
    getLTCPrices = async (date) => {
        const response = await axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=NGN&ts=${date}`);
        return response
    };
    getETHPrices = async (date) => {
        const response = await axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=NGN&ts=${date}`);
        return response
    };

    getAllPrices = async (day) => {
        const unixDate = moment().subtract(day, 'days').unix();
        const response = await axios.all([this.getETHPrices(unixDate), this.getBTCPrices(unixDate), this.getLTCPrices(unixDate)])  
        const [ETH, BTC, LTC] = await response
        return {
            date: moment.unix(unixDate).format("MMMM Do YYYY"),
            ETH: ETH.data.ETH.NGN,
            BTC: BTC.data.BTC.NGN,
            LTC: LTC.data.LTC.NGN,
        }
    }

    async componentDidMount() {
        if (!navigator.onLine) {
            debugger
            this.setState({ todayPrice: JSON.parse(localStorage.getItem('todayPrice')) });
            this.setState({ oneDayPrice: JSON.parse(localStorage.getItem('twoDaysPrice')) });
            this.setState({ twoDaysPrice: JSON.parse(localStorage.getItem('twoDaysPrice')) });
            this.setState({ threeDaysPrice: JSON.parse(localStorage.getItem('threeDaysPrice')) });
            this.setState({ fourDaysPrice: JSON.parse(localStorage.getItem('fourDaysPrice')) });
            this.setState({ fiveDaysPrice: JSON.parse(localStorage.getItem('fiveDaysPrice')) });
            this.setState({ error: JSON.parse(localStorage.getItem('error')) });
        }
        try {
            
            this.setState({
            todayPrice :  await this.getAllPrices(0),
            oneDayPrice: await this.getAllPrices(1),
            twoDaysPrice: await this.getAllPrices(2),
            threeDaysPrice: await this.getAllPrices(3),
            fourDaysPrice: await this.getAllPrices(4),
            fiveDaysPrice: await this.getAllPrices(5),
        })
        localStorage.setItem('oneDayPrice', JSON.stringify(this.state.todayPrice));
        

        // getYesterdayPrice()
        localStorage.setItem('oneDayPrice', JSON.stringify(this.state.oneDayPrice));
        

        // getTwoDaysPrice()
        localStorage.setItem('twoDaysPrice', JSON.stringify(this.state.twoDaysPrice));
        
        // getThreeDaysPrice()
        localStorage.setItem('threeDaysPrice', JSON.stringify(this.state.threeDaysPrice));
        
        // getFourDaysPrice()
        localStorage.setItem('fourDaysPrice', JSON.stringify(this.state.fourDaysPrice));
       
        localStorage.setItem('fiveDaysPrice', JSON.stringify(this.state.fiveDaysPrice));

        localStorage.setItem('error', '');

        debugger
        
        } catch (error) {
            this.setState({error:'Exceeded the maximum API Call, You can just refresh the page'})
            
        }
        
    }
        
        


    render() {
        console.log(this.state)
        const {todayPrice,oneDayPrice,twoDaysPrice,threeDaysPrice,fourDaysPrice,fiveDaysPrice, error} = this.state
        return (
            <div className="history--section container">
                <h2>History (Past 5 days)</h2>
                <p>{error}</p>
                <div className="history--section__box">
                    <Box price={todayPrice}/>
                    <Box price={oneDayPrice}/>
                    <Box price={twoDaysPrice}/>
                    <Box price={threeDaysPrice}/>
                    <Box price={fourDaysPrice}/>
                    <Box price={fiveDaysPrice}/>
                </div>
            </div>
            )
        }
}

