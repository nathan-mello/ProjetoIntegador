import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Loader from '../../components/Loader';
import { createWorker } from 'tesseract.js';
import './styles.css';
import { getValuesFromForm, formatValuesToForm, formatDocuments } from '../../utils';
import { createStudent } from '../../api';

const SignUp = () => {
  const [ocr, setOcr] = useState('');
  const [name, setName] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const worker = createWorker();
  
  const doOCR = async (file) => {
    await worker.load();
    await worker.loadLanguage('por');
    await worker.initialize('por');
    const { data: { text } } = await worker.recognize(file);
    setOcr(text);
    return getOcrResult(text);
  }

  const onChangeFile = (e) => {
    const files = [...e.target.files];
    setFiles(files);
  }

  const validateOcr = (file) => {
    setShow(true);
    return doOCR(file);
  }

  const closeModal = () => setShow(false);

  const getOcrResult = (text = '') => {
    const names = name.split(' ');
    const result = names.filter(n => text.toLowerCase().includes(n.toLowerCase())).length
    return Boolean(result);
  };

  const displayOcrResult = () => {
    if (getOcrResult(ocr)) {
      return 'Identidade validada!'
    }
    return 'Falha ao validar identidade!';
  }

  const submitForm = async (e) => {
    e.preventDefault();
    const values = getValuesFromForm(e.target);
    const files64 = await formatDocuments(files);
    const payload = formatValuesToForm(values, files, files64);
    const identityFile = files.find(f => f.name.includes('identidade'));
    if (identityFile) {
      setLoading(true)
      validateOcr(identityFile)
        .then(result => {
          if (result) {
            return createStudent(payload);
          }
          throw new Error();
        })
        .then(() => setLoading(false))
        .catch(() => {
          setShow(false);
          setLoading(false);
          alert('Algo deu errado! Por favor, tente novamente.');
        });
    } else {
      alert('Nenhum arquivo de identidade encontrado!');
    }
  }

  return (
    <div className="signup">
      <Row className="signup__title">
        <h1>Cadastro de matrícula online</h1>
      </Row>
      <Row>
        <Col>
          <iframe className="vr" title="vr" src="http://projeto-integrador-vr.com.s3-website-sa-east-1.amazonaws.com/" />
        </Col>

        <Col>
          <Form onSubmit={submitForm}>
            <Form.Group>
              <Form.Label>Nome completo</Form.Label>
              <Form.Control
                required
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Digite aqui seu nome completo"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email" 
                placeholder="Digite seu email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                required 
                type="tel" 
                placeholder="Digite aqui seu número celular"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>CPF</Form.Label>
              <Form.Control
                required 
                type="text" 
                placeholder="Digite aqui seu CPF"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                required 
                type="address" 
                placeholder="Digite aqui seu endereço"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Escola Anterior</Form.Label>
              <Form.Control
                required 
                type="text" 
                placeholder="Digite aqui aonde estudava anteriormente"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Curso</Form.Label>
              <Form.Control
                required 
                type="text" 
                placeholder="Digite aqui seu curso"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Arquivos</Form.Label>
              <Form.File
                required 
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

      </Row>

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>
            {loading ? "Processando identidade..." : displayOcrResult()}
          </Modal.Title>
        </Modal.Header>

          <Modal.Body style={{ textAlign: 'center' }}>
            {loading ? (
              <Loader />
            ) : (
              <div>
                <p>Dados enviados!</p>
                <p>Bem-vindo à Unitri!</p>
                <p>Muito obrigado pela preferência!</p>
              </div>
            )}
          </Modal.Body>
        
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
