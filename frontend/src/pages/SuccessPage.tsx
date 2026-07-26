import { useParams } from 'react-router-dom';

export default function SuccessPage() {
  const { id } = useParams();

  return <h1>Success {id}</h1>;
}