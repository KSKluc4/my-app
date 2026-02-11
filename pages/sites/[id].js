import { useRouter } from 'next/router';
import useSWR from 'swr';
import PageHeader from '@/components/PageHeader';
import SiteDetails from '@/components/SiteDetails';
import Error from 'next/error';

export default function Site() {
  const router = useRouter();
  const { id } = router.query;

  // Use the ID from the URL to fetch specific site data
  const { data, error } = useSWR(id ? `${process.env.NEXT_PUBLIC_API_URL}/sites/${id}` : null);

  if (error || (data && data.message)) {
    return <Error statusCode={404} />;
  }

  if (!data) return null; 

  return (
    <>
      <PageHeader text={data.siteName} />
      <SiteDetails site={data} />
    </>
  );
}