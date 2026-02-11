import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { Pagination, Table } from 'react-bootstrap';
import { useRouter } from 'next/router';
import PageHeader from '@/components/PageHeader';

export default function Home() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const router = useRouter();

  // Fetch data using the .env variable we set up earlier
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/sites?page=${page}&perPage=10`);

  useEffect(() => {
    if (data) {
      setPageData(data);
    }
  }, [data]);

  const previousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  if (error) return <div>Failed to load sites.</div>;
  if (!data) return null; // Or a loading spinner

  return (
    <>
      <PageHeader text="List of Historical Sites in Canada" />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Town</th>
            <th>Province / Territory</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((site) => (
            <tr key={site._id} onClick={() => router.push(`/sites/${site._id}`)} style={{ cursor: 'pointer' }}>
              <td>{site.siteName}</td>
              <td>{site.location.town}</td>
              <td>{site.provinceOrTerritory.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev onClick={previousPage} />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next onClick={nextPage} />
      </Pagination>
    </>
  );
}