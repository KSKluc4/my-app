import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { Row, Col, Container } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';
import SiteCard from '@/components/SiteCard';

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom); // [cite: 95]

  if (favouritesList.length === 0) {
    return (
      <Container>
        <PageHeader text="Nothing Here" subtext="Add some sites to your favourites to see them here!" /> {/* [cite: 100] */}
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader text="Favourites" subtext="Your Favourite Sites" /> {/* [cite: 97] */}
      <Row className="gy-4"> {/* [cite: 98] */}
        {favouritesList.map(id => (
          <Col lg={3} md={6} key={id}>
            <SiteCard siteId={id} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}