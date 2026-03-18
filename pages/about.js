import Link from 'next/link';
import { Card } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';
import SiteDetails from '@/components/SiteDetails';

export async function getStaticProps() {
  // This fetches the specific "Abbot Pass Refuge Cabin" site for the About page
  const res = await fetch('https://sites-api-yorj.vercel.app/api/sites/698ca298cf3f77b569b700ab');
  const data = await res.json();

  return { props: { site: data } };
}

export default function About(props) {
  // Define the hard-coded site ID used for this page [cite: 75]
  const staticSiteId = "698ca298cf3f77b569b700ab";

  return (
    <>
      <PageHeader text="About the Developer: Lucas" />
      <Card>
        <Card.Body>
          <p>Hi, I'm Lucas! I'm a 20-year-old developer with a passion for software development, video game editing, and building high-performance PCs.</p>
          <p>I built this application to showcase historical sites across Canada using Next.js and MongoDB.</p>
          <p>One of the most interesting sites in the database is the:</p>
          <Link href={`/sites/${staticSiteId}`} passHref>
              Abbot Pass Refuge Cabin
          </Link>
          <br /><br />
          {/* Update SiteDetails to include siteId and hide the Favourite button [cite: 75] */}
          <SiteDetails 
            site={props.site} 
            siteId={staticSiteId} 
            showFavouriteBtn={false} 
          />
        </Card.Body>
      </Card>
    </>
  );
}