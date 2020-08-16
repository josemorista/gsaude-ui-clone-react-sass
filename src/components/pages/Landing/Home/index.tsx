import React, {useRef} from 'react';
import './landingHomeStyles.scss';
import {Button} from '../../../templates/Button';
import logo from '../../../../assets/imgs/logo.png';
import {useHistory} from 'react-router-dom';
import {AiOutlineRight} from 'react-icons/ai';

export const LandingHome = () => {
  const history = useHistory();
  const aboutRef = useRef<HTMLDivElement>(null);

  return (
    <div className="container-home">
      <header className="header">
        <img src={logo} alt='Garante Saúde' />
        <Button icon={<AiOutlineRight />} color='secondary' onClick={() => {
          history.push('/entrar');
        }}>Entrar</Button>
      </header>
      <main className="intro">
        <div className="intro-content">
          <p className="intro-hello">
            Olá!
          </p>
          <p className="intro-welcome">
            Nascemos para <b>auxiliar você</b> a se cuidar melhor.
          </p>
          <Button onClick={() => {
            if (aboutRef.current) {
              aboutRef.current.scrollIntoView();
            }
          }}>Saiba mais</Button>
        </div>
      </main>
      <footer className="footer" ref={aboutRef}>
        <p className='footer-title'>
          <b>Embarque conosco nesta jornada!</b>
        </p>
        <p className='footer-text'>
          Estamos chegando em uma fase do desenvolvimento tecnológico em que veremos foguetes saindo dos aeroportos fazendo viagens para qualquer lugar do mundo em menos de 60 minutos,
          carros autônomos pegando a gente no trabalho e levando ao cinema e drones entregando pizza. Parece distante? Pode ter certeza que não. E, mais, antes de tudo isso, você mesmo
          estará utilizando tecnologia de ponta para cuidar ainda mais da sua saúde. Difícil acreditar? Então vem cá, faça o login e, desde já, seja muito bem vindo ao
          futuro!
        </p>
      </footer>
    </div>
  );
};