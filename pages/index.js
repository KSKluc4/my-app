/********************************************************************************
* WEB422 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Lucas Rafael de Faria Marques Student ID: 149880239 Date: 18/03/2026
*
********************************************************************************/

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import PageHeader from '../components/PageHeader';

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  function submitForm(data) {
    router.push({
      pathname: '/sites',
      query: Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== ''))
    });
  }

  return (
    <Container>
      {/* Centered Blue Header to match your image [cite: 23, 25] */}
      <div className="text-center p-5 mb-4 bg-light rounded-3">
        <h1 className="text-primary display-4">Search for Sites</h1>
        <p className="lead text-muted">Browse the extensive collection of sites from our National Historic Sites API.</p>
      </div>
      
      <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Name (contains)</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter name (e.g. 'can' or 'Canadian')" 
                {...register("name", { required: true })} 
                className={errors.name ? "is-invalid" : ""}
              />
              {errors.name && <div className="invalid-feedback">Name is required.</div>}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Description (contains)</Form.Label>
              <Form.Control type="text" placeholder="Enter description (e.g. 'min' or 'terminal')" {...register("description")} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Year (of opened, completed, ...)</Form.Label>
              <Form.Control type="text" placeholder="Enter year (e.g. 1908)" {...register("year")} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Town / City (contains)</Form.Label>
              <Form.Control type="text" placeholder="Enter town code (e.g. 'tt' or 'Ottawa')" {...register("town")} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Province or Territory Code</Form.Label>
              <Form.Control type="text" placeholder="Enter province or territory code (e.g. ON)" {...register("provinceOrTerritoryCode")} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            {/* Full-width blue Search button [cite: 8, 9] */}
            <Button variant="primary" type="submit" className="w-100 p-2">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}