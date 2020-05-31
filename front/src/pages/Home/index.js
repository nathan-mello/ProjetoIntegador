import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import './styles.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Loader from '../../components/Loader'
import Modal from 'react-bootstrap/Modal';

const Home = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState({}); 

  const getRandomColor = () => 
    `#${Math.floor(Math.random()*16777215).toString(16)}`;

  const selectStudent = (student) => setStudent(student);

  const clearStudent = () => setStudent({});

  const shouldShow = () => Boolean(student.name);

  const getStudents = () => {
    setTimeout(() => {
      setStudents([
        {
          name: 'Diogo Mafra Queiroga Barroso Magalhães',
          cpf: '133.094.947-34',
          university: 'Universidade Federal de Uberlândia',
          course: 'Ciência da Computação',
          address: 'Avenida Afonso Pena 1456, Bairro Aparecida' 
        },

        {
          name: 'Luisa Andrade Martins',
          cpf: '111.092.127-32',
          university: 'ESAMC',
          course: 'Matemática',
          address: 'Avenida Afonso Pena 1456, Bairro Aparecida' 
        }
      ])
      setLoading(false)
    }, 3000);
    
  }

  const searchStudent = (e) => {
    e.preventDefault();
    setLoading(true);
    getStudents();
  }

  return (
    <div className="search">
      <h1>Encontre alunos</h1>
      <Form onSubmit={searchStudent} className="search__form">
        <Row>
          <Col>
            <Form.Control placeholder="Busque um aluno por nome" />
          </Col>
          <Button type="submit" variant="primary">
            Buscar
          </Button>
        </Row>
      </Form>

      <div className="search__list">
        {loading ? (
          <Loader />
        ) : students.map(s => (
            <button onClick={() => selectStudent(s)} key={s.cpf} className="list__item">
              <div className="item__info">
                <p className="info__main">{s.name}</p>
                <p className="info__secondary">{s.course}</p>
              </div>
              <div className="item__avatar" style={{ backgroundColor: getRandomColor() }}>
                {s.name[0]}
              </div>
            </button>
          ))}
      </div>

      <Modal show={shouldShow()} onHide={clearStudent}>
        <Modal.Header closeButton>
          <div 
            className="item__avatar"
            style={{ backgroundColor: getRandomColor() }}
          >
            {student.name && student.name[0]}
          </div>
        </Modal.Header>
        <Modal.Body className="modal__body">
          <Modal.Title>{student.name}</Modal.Title>
          <div className="info__container">
            <p>
              <label className="info__label">CPF: </label>
              {student.cpf}
            </p>
            <p>
              <label className="info__label">Escola Anterior: </label>
              {student.university}
            </p>
            <p>
              <label className="info__label">Curso: </label>
              {student.course}
            </p>
            <p>
              <label className="info__label">Endereço: </label>
              {student.address}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={clearStudent}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
};

export default Home;