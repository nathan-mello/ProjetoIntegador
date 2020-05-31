import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './styles.css';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const submit = (e) => {
    e.preventDefault();
    history.push('/home');
  }

  return (
    <div id="login">
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            placeholder="example@example.com" 
            type="email" 
            value={login} 
            required
            onChange={e => setLogin(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Senha</Form.Label>
          <Form.Control
            placeholder="Senha"
            type="password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" block>
          Entrar
        </Button>
      </Form>
    </div>
  )
};

export default Login;
