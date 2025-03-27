import { Paper, Typography, Box, CircularProgress } from '@mui/material';

const HoursList = ({ hours, loading, error }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4, bgcolor: '#ffebee' }}>
        <Typography color="error">
          Error: {error}
        </Typography>
      </Paper>
    );
  }

  if (!hours?.length) {
    return null;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Horas Recomendadas
      </Typography>
      <Box sx={{ mt: 2 }}>
        {hours.map((hour) => (
          <Typography key={hour} variant="body1" sx={{ mb: 1 }}>
            {hour}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
};

export default HoursList;
