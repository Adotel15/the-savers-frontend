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
      <Grid container spacing={2} columns={12}>
        {recommendations.body.recommendations[0].map((product, index) => (
          <Grid item xs={6} key={index}>
            <Card>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  image={product.images.main}
                  alt={product.name}
                  sx={{ 
                    width: '100%',
                    height: { xs: 200, sm: 280 },
                    objectFit: 'cover'
                  }}
                />
              </Box>
              <CardContent>
                <Typography 
                  variant="body1" 
                  align="left"
                  sx={{
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: 1.2,
                    minHeight: '2.4em'
                  }}
                >
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
