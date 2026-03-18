import { useRouter } from 'next/router';
import useSWR from 'swr';
import SiteDetails from '@/components/SiteDetails';
import Error from 'next/error';

export default function Site() {
  const router = useRouter();
  const { siteId } = router.query; // Extract siteId from the URL 

  // Fetch the specific site data using the siteId
  const { data, error } = useSWR(
    siteId ? `${process.env.NEXT_PUBLIC_API_URL}/sites/${siteId}` : null
  );

  if (error) return <Error statusCode={404} />;
  if (!data) return null; // Loading state

  return (
    // Pass both the 'data' (as site) and the 'siteId' string to SiteDetails 
    <SiteDetails site={data} siteId={siteId} />
  );
}