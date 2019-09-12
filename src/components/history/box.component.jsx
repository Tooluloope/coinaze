import React from 'react';
import PropTypes from 'prop-types';
import './history.style.scss';

export const Box = ({price}) =>
	<div className="history--section__box__inner">
		<h4>{price.date}</h4>
		<div className="columns">
			<div className="column">
				<p>1 BTC = {'\u20A6'}{price.BTC}</p>
			</div>
			<div className="column">
				<p>1 ETH = {'\u20A6'}{price.ETH}</p>
			</div>
			<div className="column">
				<p>1 LTC = {'\u20A6'}{price.LTC}</p>
			</div>
		</div>
	</div>;

Box.propTypes = {
	price: PropTypes.object.isRequired
};

Box.defaultProps = {
	price: {
		
		BTC: 0,
		ETH: 0,
        LTC: 0,
        date: '',
	}
};