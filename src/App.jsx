import { useState } from 'react';
import { Container, AppBar, Toolbar, Typography, CssBaseline, Box, Tab, Tabs } from '@mui/material';
import ProductSelector from './components/ProductSelector';
import RecommendationsList from './components/RecommendationsList';
import HoursRecommendation from './components/HoursRecommendation';
import { getRecommendations } from './services/api';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} style={{ marginTop: '20px' }}>
      {value === index && children}
    </div>
  );
}

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProductsSubmit = async (selectedProducts, purchaseHistory) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getRecommendations(selectedProducts, purchaseHistory);
      setRecommendations(data);
    } catch (err) {
      setError(err);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            The savers
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Horas" />
            <Tab label="Productos" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <HoursRecommendation />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <ProductSelector onProductsSubmit={handleProductsSubmit} />
          <RecommendationsList
            recommendations={recommendations}
            loading={loading}
            error={error}
          />
        </TabPanel>
      </Container>
    </>
  );
}

export default App;
