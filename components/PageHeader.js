import { Card } from 'react-bootstrap';

export default function PageHeader({ text, subtext }) {
  return (
    <>
      <Card className="bg-light">
        <Card.Body>
          {/* Main text rendered in bold [cite: 25] */}
          <strong>{text}</strong>
          
          {/* Render subtext and a line break only if subtext is truthy  */}
          {subtext && (
            <>
              <br />
              {subtext}
            </>
          )}
        </Card.Body>
      </Card>
      <br />
    </>
  );
}