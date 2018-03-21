import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CountdownTimer from './CountdownTimer';
import CoinFlip from './CoinFlip';
import Header from './Header';

const App = (props) =>
(
	<div>
		<BrowserRouter>
			<div>
				<Header />
				<div className="container">
					<Route exact path="/" component={CountdownTimer} />
					<Route exact path="/coin_flip" component={CoinFlip} />
				</div>
			</div>
		</BrowserRouter>
	</div>
);

export default App;