import { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  CircularProgress, 
  Grid,
  Card,
  CardContent,
  Button,
  Snackbar,
  Alert
} from '@mui/material';

const HoursList = ({ hours, loading, error }) => {
  const [selectedHour, setSelectedHour] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

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

  if (!hours?.body?.length) {
    return null;
  }

  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
  };

  const handleReserve = () => {
    if (selectedHour) {
      setShowSnackbar(true);
      setSelectedHour(null);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Horas Disponibles
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {hours.body.map((timeSlot) => (
          <Grid item xs={6} sm={4} md={3} key={timeSlot.hour}>
            <Card 
              sx={{ 
                cursor: timeSlot.recommended ? 'pointer' : 'not-allowed',
                bgcolor: selectedHour === timeSlot.hour ? '#e3f2fd' : 
                        timeSlot.recommended ? 'white' : '#f5f5f5',
                opacity: timeSlot.recommended ? 1 : 0.7
              }}
              onClick={() => timeSlot.recommended && handleHourSelect(timeSlot.hour)}
            >
              <CardContent>
                <Typography 
                  variant="h6" 
                  align="center"
                  color={timeSlot.recommended ? 'primary' : 'text.secondary'}
                >
                  {timeSlot.hour}
                </Typography>
                <Typography 
                  variant="caption" 
                  display="block" 
                  align="center"
                  color={timeSlot.recommended ? 'success.main' : 'text.secondary'}
                >
                  {timeSlot.recommended ? 'Recomendada' : 'No recomendada'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          color="primary"
          disabled={!selectedHour}
          onClick={handleReserve}
          sx={{ minWidth: 200 }}
        >
          Reservar Cita
        </Button>
      </Box>

      <Snackbar 
        open={showSnackbar} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Cita reservada en la tienda
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default HoursList;
