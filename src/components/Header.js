import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) =>
(
	<div>
		<div style={{marginTop: "20px"}} />
		<div className="container">
			<Link to="/">
				Countdown Timer
			</Link>
			<span style={{marginLeft: "20px"}} />
			<Link to="/coin_flip">
				Coin Flip
			</Link>
		</div>
		<div style={{marginTop: "20px"}} />
		<hr />
	</div>
);

export default Header;