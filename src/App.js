import React, { Component } from 'react'
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';

class App extends Component {

  state = {
    termino: '',
    imagenes: [],
    pagina: ''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start')
  }

  paginaAnterior = () => {
        // leer el state de la pagina actual

    let pagina = this.state.pagina;

    // leer si la pagina es 1 no ir hacia atras

    if(pagina === 1) return null;

    // restar uno a la pagina actual

    pagina -= 1;

    // agregar el cambio al state

    this.setState({
      pagina
    }, ()=> {
      this.consultarApi();
      this.scroll();
    });

  }


  paginaSiguiente = () => {
    // leer el state de la pagina actual

    let pagina = this.state.pagina;

    // sumar uno a la pagina actual

    pagina += 1;

    // agregar el cambio al state

    this.setState({
      pagina
    }, ()=> {
      this.consultarApi();
      this.scroll();
    });


  }

  consultarApi = () => {

    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=13059797-fcd885d3ca0502b80f0d432c8&q=${termino}&per_page=32&page=${pagina}`;
    // console.log(url)
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => this.setState({ imagenes : resultado.hits}))
  }

  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina : 1
    }, () => {
      this.consultarApi();
    })
  }
  render() {
    return(
      <div className="App container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imagenes de Sergio y maria</p>
          <Buscador datosBusqueda={this.datosBusqueda} />
        </div>  
        <div className="row justify-content-center">
          <Resultado
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}

export default App;
