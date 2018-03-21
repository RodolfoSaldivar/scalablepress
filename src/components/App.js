import React, { Component } from 'react';

class App extends Component
{
	constructor(props) {
		super(props);
		this.state = {
			dias: 0,
			horas: 1,
			minutos: 0,
			segundos: 2
		};
	}

	componentDidMount = () =>
	{
		this.contador = setInterval(this.cuentaRegresiva, 1000);
	};

	cuentaRegresiva = () =>
	{
		let { dias, horas, minutos, segundos } = this.state;

		if (dias === 0 && horas === 0 && minutos === 0 && segundos === 0) return clearInterval(this.contador);

		segundos--;
		if (segundos < 0)
		{
			if (minutos > 0)
			{
				minutos--;
				segundos = 59;
			}
			else
			{
				if (horas > 0)
				{
					horas--;
					minutos = 59;
					segundos = 59;
				}
				else
				{
					
				}
			}
		}


		this.setState({ dias, horas, minutos, segundos });
	};

	render()
	{
		return (
			<div className="contenedor">
				<div style={{marginTop: "60px"}} />
				<div className="cuadros valign left">
					{ this.state.dias }
				</div>
				<div className="cuadros valign left">
					{ this.state.horas }
				</div>
				<div className="cuadros valign left">
					{ this.state.minutos }
				</div>
				<div className="cuadros valign left">
					{ this.state.segundos }
				</div>
			</div>
		);
	}
}

export default App;