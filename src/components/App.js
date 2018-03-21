import React, { Component } from 'react';

class App extends Component
{
//----> Parameters are defined
	constructor(props) {
		super(props);
		this.state = {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			days_form: 0,
			hours_form: 0,
			minutes_form: 0,
			seconds_form: 0
		};
	}

//----> Counter starts when called
	startCounter = () =>
	{
		this.stopCounter();
		const { days_form, hours_form, minutes_form, seconds_form } = this.state;
		this.setState({
			days: days_form,
			hours: hours_form,
			minutes: minutes_form,
			seconds: seconds_form
		});
		this.counter = setInterval(this.countdown, 1000);
	};

//----> Stops the counter
	stopCounter = () => clearInterval(this.counter);

//----> Function that substracts minutes and puts seconds
	substractMinutes = (minutes, seconds) => this.setState({ minutes: minutes-1, seconds: 59 });

//----> Function that substracts hours and puts minutes and seconds
	substractHours = (hours, minutes, seconds) => this.setState({ hours: hours-1, minutes: 59, seconds: 59 });

//----> All the countdown logic
	countdown = () =>
	{
		let { days, hours, minutes, seconds } = this.state;

		// If everything is 0 the counter stops
		if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) return this.stopCounter();

		seconds--;

		// If seconds is greater or igual to 0, updates the state and finishes the process
		if (seconds >= 0) return this.setState({ seconds });

		// If seconds is less than 0 and there are minutes left
		if (minutes > 0) return this.substractMinutes(minutes, seconds);
		
		// If seconds is less than 0 and there are hours left
		if (hours > 0) return this.substractHours(hours, minutes, seconds);
		
		// If seconds is less than 0 and there is no more than days to substract
		days--;
		hours = 23;
		minutes = seconds = 59;
		this.setState({ days, hours, minutes, seconds });
	};

//----> When the input changes, it is set to the state
	handleChange = (event, key, min, max) =>
	{
		let { value } = event.target;
		if (value < min) value = min;
		if (value > max) value = max;
		this.setState({ [key]: value });
	};

//----> Displays the input for each section
	displayInput = (label, key, min, max) =>
	(
		<span>
			{ label }
			<input
				type="number"
				value={this.state[key]}
				onChange={(event) => this.handleChange(event, key, min, max)}
				min={min} max={max}
			/>
		</span>
	);

//----> Displays the squares where the countdown is seen
	displaySquare = (key) =>
	(
		<div className="square valign left">
			{ this.state[key] }
		</div>
	);

//----> Render method that outputs everything
	render()
	{
		return (
			<div className="container">

				<div style={{marginTop: "60px"}} />
				<span style={{marginLeft: "40px"}} />

				{ this.displayInput('Days: ', 'days_form', 0, 50) }
				{ this.displayInput('Hours: ', 'hours_form', 0, 23) }
				{ this.displayInput('Minutes: ', 'minutes_form', 0, 59) }
				{ this.displayInput('Seconds: ', 'seconds_form', 0, 59) }

				<button onClick={ this.startCounter }>
					Start
				</button>

				<div style={{marginTop: "60px"}} />

				{ this.displaySquare('days') }
				{ this.displaySquare('hours') }
				{ this.displaySquare('minutes') }
				{ this.displaySquare('seconds') }

			</div>
		);
	}
}

export default App;