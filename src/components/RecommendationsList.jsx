import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  CardMedia,
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

  if (!recommendations?.body?.recommendations?.length) {
    return null;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Productos Recomendados
      </Typography>
      <Grid container spacing={3}>
        {recommendations.body.recommendations[0].map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                image={product.images.main}
                alt={product.name}
                sx={{ 
                  height: 300,
                  objectFit: 'cover'
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" align="center" gutterBottom>
                  {product.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecommendationsList;
