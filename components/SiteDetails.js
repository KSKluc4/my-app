import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store'; // Ensure this path matches your store.js location
import { Container, Row, Col, Button } from 'react-bootstrap';

// Updated to accept siteId and showFavouriteBtn (default true) 
export default function SiteDetails({ site, siteId, showFavouriteBtn = true }) {
  // Get reference to favouritesList and the setter from favouritesAtom 
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  
  // State to track if this site is currently a favourite [cite: 81]
  // Initialized to true if the list includes siteId, false otherwise
  const [showAdded, setShowAdded] = useState(favouritesList.includes(siteId));

  // Keep showAdded in sync if favouritesList changes [cite: 81]
  useEffect(() => {
    setShowAdded(favouritesList.includes(siteId));
  }, [favouritesList, siteId]);

  // Function to handle the favourite button click [cite: 82]
  const favouritesClicked = () => {
    if (showAdded) {
      // Remove siteId from the list [cite: 83-84]
      setFavouritesList(current => current.filter(fav => fav != siteId));
      setShowAdded(false);
    } else {
      // Add siteId to the list [cite: 85-86]
      setFavouritesList(current => [...current, siteId]);
      setShowAdded(true);
    }
  };

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

          {/* Add Favourite Button if showFavouriteBtn is true [cite: 87] */}
          {showFavouriteBtn && (
            <Button 
              variant={showAdded ? "primary" : "outline-primary"} // [cite: 88]
              onClick={favouritesClicked} // [cite: 89]
              className="mt-3"
            >
              {showAdded ? "+ Favourite (added)" : "+ Favourite"} {/* [cite: 90] */}
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}