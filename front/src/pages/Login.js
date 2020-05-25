import React, { useState } from 'react';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div id="login">
      <form className="login__form">
        <input 
          value={login} 
          onChange={(e) => setLogin(e.target.value)}>
        </input>
        <input 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}>
        </input>
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
};

export default Login;
