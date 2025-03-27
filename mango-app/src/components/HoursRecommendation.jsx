import { useState } from 'react';
import { Container } from '@mui/material';
import StoreSelector from './StoreSelector';
import HoursList from './HoursList';
import { getRecommendedHours } from '../services/api';

const HoursRecommendation = () => {
  const [hours, setHours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (storeId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRecommendedHours(storeId);
      setHours(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <StoreSelector onSubmit={handleSubmit} />
      <HoursList hours={hours} loading={loading} error={error} />
    </Container>
  );
};

export default HoursRecommendation;
