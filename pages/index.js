/********************************************************************************
* WEB422 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Lucas Rafael de Faria Marques 
* Student ID: 149880239 
* Date: 18/03/2026
*
********************************************************************************/

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col } from 'react-bootstrap';
import PageHeader from '../components/PageHeader';

export default function Home() {
  const router = useRouter();
  
  // Initialize react-hook-form 
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      description: "",
      year: "",
      town: "",
      provinceOrTerritoryCode: ""
    }
  });

  // Handle form submission [cite: 35]
  function submitForm(data) {
    // Navigate to /sites while filtering out empty string values [cite: 35, 37, 40]
    router.push({
      pathname: '/sites',
      query: Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== ''))
    });
  }

  return (
    <>
      <PageHeader text="Search" subtext="Enter search criteria to find National Historic Sites" />
      
      <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              {/* Name is required; applies 'is-invalid' class on error [cite: 42, 45] */}
              <Form.Control 
                type="text" 
                placeholder="" 
                {...register("name", { required: true })} 
                className={errors.name ? "is-invalid" : ""}
              />
              {/* Error message for missing name [cite: 44] */}
              {errors.name && <div className="invalid-feedback">Name is required.</div>}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="" {...register("description")} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Control type="text" placeholder="" {...register("year")} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Town</Form.Label>
              <Form.Control type="text" placeholder="" {...register("town")} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Province or Territory Code</Form.Label>
              <Form.Control type="text" placeholder="" {...register("provinceOrTerritoryCode")} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}