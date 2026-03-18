import useSWR from 'swr';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import Error from 'next/error';

export default function SiteCard({ siteId }) {
  // Fetch site info using siteId prop [cite: 104, 105]
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/sites/${siteId}`);

  if (error || !data) return <Error statusCode={404} />; // [cite: 106]

  return (
    <Card>
      {/* Use same image logic as SiteDetails [cite: 108] */}
      <Card.Img 
        variant="top" 
        src={data.image || "https://via.placeholder.com/300x200?text=No+Image"} 
      />
      <Card.Body>
        <Card.Title>{data.siteName || "N/A"}</Card.Title> {/* [cite: 110] */}
        <Card.Text>
          {data.location?.town || "N/A"}, {data.provinceOrTerritory?.code || "N/A"} {/* [cite: 112, 113] */}
        </Card.Text>
        <Link href={`/sites/${siteId}`} passHref>
          <Button variant="primary">View Details</Button> {/* [cite: 114] */}
        </Link>
      </Card.Body>
    </Card>
  );
}