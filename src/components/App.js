import React, { Component } from 'react';

class App extends Component
{
//----> Se definen los parametros
	constructor(props) {
		super(props);
		this.state = {
			dias: 0,
			horas: 0,
			minutos: 0,
			segundos: 0,
			dias_form: 0,
			horas_form: 0,
			minutos_form: 0,
			segundos_form: 0
		};
	}

//----> Cuando se llama empieza el contador
	empezarContador = () =>
	{
		this.pararContador();
		const { dias_form, horas_form, minutos_form, segundos_form } = this.state;
		this.setState({
			dias: dias_form,
			horas: horas_form,
			minutos: minutos_form,
			segundos: segundos_form
		});
		this.contador = setInterval(this.cuentaRegresiva, 1000);
	};

//----> Para el contador
	pararContador = () => clearInterval(this.contador);

//----> Funcion que resta minutos y pone segundos
	restarMinutos = (minutos, segundos) => this.setState({ minutos: minutos-1, segundos: 59 });

//----> Funcion que resta horas y pone minutos y segundos
	restarHoras = (horas, minutos, segundos) => this.setState({ horas: horas-1, minutos: 59, segundos: 59 });

//----> Toda la logica del contador
	cuentaRegresiva = () =>
	{
		let { dias, horas, minutos, segundos } = this.state;

		// Si todos son 0 hay que parar el contador
		if (dias === 0 && horas === 0 && minutos === 0 && segundos === 0) return this.pararContador();

		segundos--;

		// Si segundos es mayor o igual a 0, actualiza el estado y termina el proceso
		if (segundos >= 0) return this.setState({ segundos });

		// Si segundos es menor de 0 y aun quedan minutos
		if (minutos > 0) return this.restarMinutos(minutos, segundos);
		
		// Si segundos es menor de 0 y aun quedan horas
		if (horas > 0) return this.restarHoras(horas, minutos, segundos);
		
		// Si segundos es menor de 0 y ya no queda nada mas que dias para restar
		dias--;
		horas = 23;
		minutos = segundos = 59;

		this.setState({ dias, horas, minutos, segundos });
	};

//----> Cuando cambia los input se ponen en el state
	handleChange = (event, key, min, max) =>
	{
		let valor = event.target.value;
		if (valor < min) valor = min;
		if (valor > max) valor = max;
		this.setState({ [key]: valor });
	};

//----> Despliega los inputs para cada seccion
	desplegarInput = (label, key, min, max) =>
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

//----> Despliega los cuadros donde se vera el contador
	desplegarCuadros = (key) =>
	(
		<div className="cuadros valign left">
			{ this.state[key] }
		</div>
	);

	render()
	{
		return (
			<div className="contenedor">
				<div style={{marginTop: "60px"}} />
				<span style={{marginLeft: "40px"}} />

				{ this.desplegarInput('Días: ', 'dias_form', 0, 50) }
				{ this.desplegarInput('Horas: ', 'horas_form', 0, 23) }
				{ this.desplegarInput('Minutos: ', 'minutos_form', 0, 59) }
				{ this.desplegarInput('Segundos: ', 'segundos_form', 0, 59) }

				<button onClick={this.empezarContador}>
					Empezar
				</button>

				<div style={{marginTop: "60px"}} />

				{ this.desplegarCuadros('dias') }
				{ this.desplegarCuadros('horas') }
				{ this.desplegarCuadros('minutos') }
				{ this.desplegarCuadros('segundos') }

			</div>
		);
	}
}

export default App;