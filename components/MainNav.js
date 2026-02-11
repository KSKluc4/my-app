import { Container, Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';

export default function MainNav() {
  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-dark">
        <Container>
          {/* Replace 'Your Name' with your actual name */}
          <Navbar.Brand>Your Name</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">Sites</Nav.Link>
            <Nav.Link as={Link} href="/about">About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}