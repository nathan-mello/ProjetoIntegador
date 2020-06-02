import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { login as loginPost } from '../../api';
import { useHistory } from 'react-router-dom';
import './styles.css';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const response = await loginPost({ email: login, password })
    setLoading(false)
    if (response === 'ok') {
      history.push('/home');
    } else {
      alert(response);
    }
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
        <Button disabled={loading} variant="primary" type="submit" block>
          {loading ? 'Carregando...' : 'Entrar'}
        </Button>
      </Form>
    </div>
  )
};

export default Login;
