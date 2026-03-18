import { Container, Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';

export default function MainNav() {
  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-dark">
        <Container>
          {/* Updated Brand to use Link and point to "/"  */}
          <Navbar.Brand as={Link} href="/">Lucas Marques</Navbar.Brand>
          <Nav className="me-auto">
            {/* "Sites" link removed as per instructions  */}
            <Nav.Link as={Link} href="/about">About</Nav.Link>
            {/* Added Favourites link  */}
            <Nav.Link as={Link} href="/favourites">Favourites</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}