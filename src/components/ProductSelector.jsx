import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper
} from '@mui/material';

export const ProductSelector = ({ onProductsSubmit }) => {
  const [productId, setProductId] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [historyId, setHistoryId] = useState('');

  const handleAddProduct = () => {
    if (productId && selectedProducts.length < 1) {
      setSelectedProducts([...selectedProducts, productId]);
      setProductId('');
    }
  };

  const handleAddHistory = () => {
    if (historyId) {
      setPurchaseHistory([...purchaseHistory, historyId]);
      setHistoryId('');
    }
  };

  const handleSubmit = () => {
    onProductsSubmit(selectedProducts, purchaseHistory);
  };

  const removeProduct = (index) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  const removeHistory = (index) => {
    setPurchaseHistory(purchaseHistory.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Seleccionar Productos (3)
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            label="ID del Producto"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            disabled={selectedProducts.length > 1}
          />
          <Button
            variant="contained"
            onClick={handleAddProduct}
            disabled={!productId || selectedProducts.length > 1}
          >
            Añadir
          </Button>
        </Box>
        <List>
          {selectedProducts.map((product, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <Button onClick={() => removeProduct(index)} color="error">
                  Eliminar
                </Button>
              }
            >
              <ListItemText primary={`Producto ${index + 1}: ${product}`} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Historial de Compras
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            label="ID de Compra Anterior"
            value={historyId}
            onChange={(e) => setHistoryId(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleAddHistory}
            disabled={!historyId}
          >
            Añadir
          </Button>
        </Box>
        <List>
          {purchaseHistory.map((history, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <Button onClick={() => removeHistory(index)} color="error">
                  Eliminar
                </Button>
              }
            >
              <ListItemText primary={`Compra ${index + 1}: ${history}`} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Obtener Recomendaciones
      </Button>
    </Box>
  );
};

export default ProductSelector;
