import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  CircularProgress 
} from '@mui/material';

export const RecommendationsList = ({ recommendations, loading, error }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">
          Error: {error.message || 'Ha ocurrido un error al cargar las recomendaciones'}
        </Typography>
      </Box>
    );
  }

  if (!recommendations?.length) {
    return null;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Productos Recomendados
      </Typography>
      <Grid container spacing={3}>
        {recommendations.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name || `Producto ${index + 1}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: {product.id}
                </Typography>
                {product.description && (
                  <Typography variant="body2">
                    {product.description}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecommendationsList;
