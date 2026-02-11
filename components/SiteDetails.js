import { Container, Row, Col } from 'react-bootstrap';

export default function SiteDetails({ site }) {
  return (
    <Container>
      <Row>
        <Col lg={4}>
          <img
            onError={(event) => {
              event.target.onerror = null;
              event.target.src = "https://placehold.co/400x600?text=Cover+Not+Available";
            }}
            className="img-fluid w-100"
            src={site.image || "https://placehold.co/400x600?text=Cover+Not+Available"}
            alt="Site Image"
          />
          <br /><br />
        </Col>
        <Col lg={8}>
          <h3>{site.siteName}</h3>
          <p>{site.description}</p>
          <hr />
          <h5>Dates</h5>
          <ul>
            {site.dates.map((date, index) => (
              <li key={index}>{date.year} ({date.type})</li>
            ))}
          </ul>
          <br />
          <h5>Designated</h5>
          <p>{site.designated}</p>
          <br />
          <h5>GPS Coordinates</h5>
          <p>{site.location.latitude}, {site.location.longitude}</p>
          <br />
          <h5>Location</h5>
          <p>{site.location.town}, {site.provinceOrTerritory.name}</p>
          <br />
          <h5>Region</h5>
          <p>{site.provinceOrTerritory.region}</p>
        </Col>
      </Row>
    </Container>
  );
}