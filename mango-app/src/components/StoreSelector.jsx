import { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

const StoreSelector = ({ onSubmit }) => {
  const [storeId, setStoreId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(storeId);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Recomendación de Horas
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="ID de Tienda"
          value={storeId}
          onChange={(e) => setStoreId(e.target.value)}
          margin="normal"
          required
          placeholder="Ej: 0548"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={!storeId}
        >
          Obtener mejor hora de recogida
        </Button>
      </Box>
    </Paper>
  );
};

export default StoreSelector;
