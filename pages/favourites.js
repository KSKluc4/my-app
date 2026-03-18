import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { Row, Col, Container } from 'react-bootstrap';
import SiteCard from '@/components/SiteCard';

export default function Favourites() {
  // Get a reference to the favouritesList from the favouritesAtom [cite: 95]
  const [favouritesList] = useAtom(favouritesAtom);

  // If favouritesList does not have any items in it [cite: 99]
  if (favouritesList.length === 0) {
    return (
      <Container>
        {/* Centered Blue Header to match your image requirement  */}
        <div className="text-center p-5 mb-4 bg-light rounded-3">
          <h1 className="text-primary display-4">Nothing Here</h1>
          <p className="lead text-muted">Try adding a site to the list</p>
        </div>
      </Container>
    );
  }

  // If favouritesList has items in it [cite: 96]
  return (
    <Container>
      <div className="text-center p-5 mb-4 bg-light rounded-3">
        <h1 className="text-primary display-4">Favourites</h1>
        <p className="lead text-muted">Your Favourite Sites</p>
      </div>
      {/* Renders a single SiteCard for every item in the favourites array  */}
      <Row className="gy-4">
        {favouritesList.map((siteId) => (
          <Col lg={3} md={6} key={siteId}>
            <SiteCard siteId={siteId} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}