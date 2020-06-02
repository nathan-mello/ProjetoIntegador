import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import './styles.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Loader from '../../components/Loader'
import Modal from 'react-bootstrap/Modal';
import { getAllStudents, getStudentByName } from '../../api';
import { getValuesFromForm } from '../../utils';

const Home = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState({}); 

  const getRandomColor = () => {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
  }; 

  const selectStudent = (student) => setStudent(student);

  const clearStudent = () => setStudent({});

  const shouldShow = () => Boolean(student.name);

  const searchStudent = async (e) => {
    e.preventDefault();
    const input = getValuesFromForm(e.target)[0];
    setLoading(true);
    const response = await getStudentByName(input);
    setLoading(false);
    if (response.length) {
      setStudents(response);
    } else {
      setStudents([]);
    }
  }

  const fetchAllStudents = async () => {
    setLoading(true);
    const allStudents = await getAllStudents();
    setLoading(false);
    if (allStudents.length) {
      setStudents(allStudents);
    } else {
      console.log(allStudents);
    }
  }

  const getDocumentHref = ({ name, file }) => {
    const isImage = name.includes('png') || name.includes('jpg') || name.includes('jpeg');
    if (isImage) {
      return `data:image/png;base64,${file}`;
    }
    return `data:application/pdf;base64,${file}`;
  }

  useEffect(() => {
    fetchAllStudents();
  }, []);

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
        ) : students.length ? students.map(s => (
              <button onClick={() => selectStudent(s)} key={s.cpf} className="list__item">
                <div className="item__info">
                  <p className="info__main">{s.name}</p>
                  <p className="info__secondary">{s.course}</p>
                </div>
                <div className="item__avatar" style={{ backgroundColor: getRandomColor() }}>
                  {s.name[0]}
                </div>
              </button>
            )
          ) : (
            <h4>Nenhum aluno encontrado</h4>
          )
        }
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
              {student.previousUniversity}
            </p>
            <p>
              <label className="info__label">Curso: </label>
              {student.course}
            </p>
            <p>
              <label className="info__label">Endereço: </label>
              {student.address}
            </p>
            <p>
              <label className="info__label">Telefone: </label>
              {student.phoneNumber}
            </p>
            <p>
              <label className="info__label">Arquivos: </label> 
              {student?.documents?.map(d => (
                <a 
                  key={d.id}
                  download={d.name} 
                  href={getDocumentHref(d)}>
                  {d.name}
                </a>
              ))}
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