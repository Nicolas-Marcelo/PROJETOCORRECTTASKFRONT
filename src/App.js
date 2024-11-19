import React, { useState } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import Rotas from './Routes/Rotas';
import Header from './DataManipulation/Header';
import './App.css';

function App() {
  const [menuAberto, setMenuAberto] = useState(false);

  const contrlMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <BrowserRouter>
      <Header onMenuClick={contrlMenu} />
      <button className={`toggle-btn ${menuAberto ? 'open' : ''}`} onClick={contrlMenu}>
        ☰
      </button>
      <div className={`sidebar ${menuAberto ? 'open' : ''}`}>
        <nav>
          <Link to='/home' onClick={contrlMenu}>Home</Link>
          <Link to='/googleauth' onClick={contrlMenu}>Minha Conta</Link>
          <Link to='/adicionar' onClick={contrlMenu}>Adicionar Desafio</Link>
          <Link to='/exibirdesafio' onClick={contrlMenu}>Meus Desafios</Link>
        </nav>
      </div>
      <div className={`content ${menuAberto ? 'content-open' : ''}`}>
        <Rotas />
      </div>
    </BrowserRouter>
  );
}

export default App;
