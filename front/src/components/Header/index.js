import React from 'react';
import Button from 'react-bootstrap/Button';
import './styles.css';

const Header = () => {
  const showSignOut = () => !window.location.pathname.includes('/login')

  const signOut = () => {
    window.location.href = '/login';
  }

  return (
    <header className="header">
      <img 
        src="https://unitri.edu.br/wp-content/themes/universo/assets/img/logotopounitri.png" 
        alt="logo-unitri" 
      />
      {showSignOut() && (
        <Button variant="secondary" onClick={() => signOut()}>
          Sair
        </Button>
      )}      
    </header>
  )
};

export default Header;