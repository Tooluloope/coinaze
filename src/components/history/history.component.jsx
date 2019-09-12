import React, { Component } from 'react';
import './history.style.scss';
import axios from 'axios';
import moment from 'moment';
import {Box} from './box.component'

export default class History extends Component {
    constructor(props) {
        super(props)
        this.state ={
            todayPrice:'',
            oneDayPrice:'',
            twoDaysPrice:'',
            threeDaysPrice:'',
            fourDaysPrice:'',
            fiveDaysPrice:'',
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
        try {
            this.setState({
            todayPrice :  await this.getAllPrices(0),
            oneDayPrice: await this.getAllPrices(1),
            twoDaysPrice: await this.getAllPrices(2),
            threeDaysPrice: await this.getAllPrices(3),
            fourDaysPrice: await this.getAllPrices(4),
            fiveDaysPrice: await this.getAllPrices(5),
        })
        } catch (error) {
            this.setState({error:'Exceeded the maximum API Call, You can just refresh the page'})
            
        }
        
    }
        
        


    render() {
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

