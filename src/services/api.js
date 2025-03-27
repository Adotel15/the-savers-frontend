const BASE_URL = 'https://apitest2.mango.com/uat-p-ai-services/api/v1';

export const getRecommendedHours = async (storeId) => {
  try {
    const response = await fetch(`${BASE_URL}/recommended-hours?storeId=${storeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching recommended hours:', error);
    throw error;
  }
};

export const getRecommendations = async (selectedProducts, purchaseHistory) => {
  try {
    // Make the recommendations request with the token
    const response = await fetch(`${BASE_URL}/recommended-items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        products: selectedProducts,
        history: purchaseHistory
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};
