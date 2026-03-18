import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { Pagination, Table } from 'react-bootstrap';
import { useRouter } from 'next/router';
import PageHeader from '@/components/PageHeader';

export default function Sites() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const router = useRouter();

  // Construct the query string from the router query parameters [cite: 52-53]
  const queryString = new URLSearchParams(router.query).toString();

  // Fetch data using the base API URL, pagination, and the new queryString [cite: 54]
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/sites?page=${page}&perPage=10&${queryString}`
  );

  useEffect(() => {
    if (data) {
      setPageData(data);
    }
  }, [data]);

  const previousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const nextPage = () => {
    // Note: In a production app, you'd check if data.length < perPage to disable next
    setPage(page + 1);
  };

  if (error) return <div>Failed to load sites.</div>;
  if (!data) return null;

  // Dynamically generate the subtext to show active search parameters [cite: 59-62]
  const currentQueryText = Object.keys(router.query)
    .map(key => `${key}: ${router.query[key]}`)
    .join(', ');

  return (
    <>
      {/* Update PageHeader with dynamic text and subtext [cite: 58-59] */}
      <PageHeader 
        text="Search Results" 
        subtext={currentQueryText || "Full list of sites"} 
      />
      
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