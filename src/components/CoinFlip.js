import React, { Component } from 'react';

class CoinFlip extends Component
{
//----> Parameters are defined
	constructor(props) {
		super(props);
		this.state = { number: 1, random: "" };
	}

//----> Function that was given to biuld the code
	flip = () => Math.random() >= 0.5;

//----> Recursive function that returns a random number between two numbers
	randomNumber = (min, max) =>
	{
		// If the 2 numbers are the same, it means there is no more division to do
		if (min === max) return min;

		// If the difference between the 2 numbers is 1; just flip the coin to chose the min or max
		if (max-min === 1) if (this.flip()) return min; else return max;

		// Get the middle between the difference of the numbers
		const middle = Math.floor((max-min)/2);

		// If the coin is true, send the first half of the range; if not, send the second half
		if (this.flip())
			return this.randomNumber(min, min+middle);
		else
			return this.randomNumber(min+middle, max);
	};

//----> Validates the min and high; sets the value and calls the flip function
	handleChange = (event, min, max) =>
	{
		let number = event.target.value;
		if (number < min) number = min;
		if (number > max) number = max;
		this.setState({ number, random: this.randomNumber(0, number-1) });
	};

//----> Displays the random number if there is one
	displayRandom = () =>
	{
		const { random } = this.state;
		if (random === "") return;

		return (
			<div>
				Random: { random }
			</div>
		);
	};

//----> Render method that outputs everything
	render()
	{
		return (
			<div>

				<div style={{marginTop: "40px"}} />

				<div>
					Number:&nbsp;
					<input
						type="number"
						value={this.state.number}
						min="1" max="999999"
						onChange={(event) => this.handleChange(event, 1, 999999)}
					/>
				</div>

				<div style={{marginTop: "30px"}} />

				<div>
					{ this.displayRandom() }
				</div>

			</div>
		);
	}
}

export default CoinFlip;