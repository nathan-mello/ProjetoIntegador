import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Loader from '../../components/Loader';
import { createWorker } from 'tesseract.js';
import './styles.css';

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const SignUp = () => {
  const [ocr, setOcr] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const worker = createWorker();
  
  const doOCR = async (file) => {
    await worker.load();
    await worker.loadLanguage('por');
    await worker.initialize('por');
    const { data: { text } } = await worker.recognize(file);
    setOcr(text);
  }

  const onChangeFile = (e) => {
    const files = [...e.target.files];
    const identityFile = files.find(f => f.name.includes('identidade'));
    if (identityFile) {
      setLoading(true);
      setShow(true);
      doOCR(identityFile)
        .then(() => setLoading(false));
    }
  }

  const closeModal = () => setShow(false);

  const getOcrResult = () => {
    const names = name.split(' ');
    return Boolean(names.filter(n => ocr.toLowerCase().includes(n.toLowerCase())).length);
  };

  const displayOcrResult = () => {
    if (getOcrResult()) {
      return 'Identidade validada!'
    }
    return 'Falha ao validar identidade!';
  }

  return (
    <div className="signup">
      <Row className="signup__title">
        <h1>Cadastro de matrícula online</h1>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>Nome completo</Form.Label>
              <Form.Control 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Digite aqui seu nome completo"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Digite seu email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Telefone</Form.Label>
              <Form.Control 
                type="tel" 
                placeholder="Digite aqui seu número celular"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>CPF</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Digite aqui seu CPF"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Endereço</Form.Label>
              <Form.Control 
                type="address" 
                placeholder="Digite aqui seu endereço"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Escola Anterior</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Digite aqui aonde estudava anteriormente"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Curso</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Digite aqui seu curso"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Arquivos</Form.Label>
              <Form.File 
                multiple
                onChange={onChangeFile}
                id="file-upload"
                label="Faça o upload dos arquivos"
                data-browse="Buscar"
                lang="pt"
                custom
              />
            </Form.Group>
            <Button type="submit" variant="primary" block>
              Enviar
            </Button>
          </Form>
        </Col>

        <Col>
          <fieldset className="instructions">
            <legend>Instruções</legend>
            <p>Por favor, preencha as informações ao lado e faça o upload dos seguintes arquivos:</p>
            <ul>
              <li>RG ou CNH</li>
              <li>Comprovante de endereço</li>
              <li>Histórico de matérias cursadas</li>
              <li>Histórico do Ensino Médio</li>
            </ul>
            <p>Nomeie os arquivos da seguinte maneira:</p>
            <ul>
              <li>RG ou CNH: <strong>identidade.png</strong></li>
            </ul>
            <p>Os demais documentos nomeie como quiser.</p>
          </fieldset>
        </Col>
      </Row>

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>
            {loading ? "Processando identidade..." : displayOcrResult()}
          </Modal.Title>
        </Modal.Header>

        {loading && (
          <Modal.Body style={{ textAlign: 'center' }}>
            <Loader />
          </Modal.Body>
        )}
        
        <Modal.Footer>
          <Button variant="primary" onClick={closeModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
};

export default SignUp;
