import axios from "axios";

// Mock examples of credentials
const FASHION_ASSISTANT_AUTH_TOKEN_ENDPOINT =
  "https://api.example.com/auth/token";
const FASHION_ASSISTANT_BASE_URL = "https://api.example.com";
const FASHION_ASSISTANT_AUTH_BASIC_USER = "";
const FASHION_ASSISTANT_AUTH_BASIC_PWD = "";
const FASHION_ASSISTANT_PRODUCTS_BASE_URL =
  "https://api.example.com/products-details";

const parseProductDetail = (details) => {
  return details;
};

const getToken = async () => {
  try {
    const url = `${FASHION_ASSISTANT_AUTH_TOKEN_ENDPOINT}?grant_type=client_credentials`;

    const credentials = Buffer.from(
      `${FASHION_ASSISTANT_AUTH_BASIC_USER}:${FASHION_ASSISTANT_AUTH_BASIC_PWD}`
    ).toString("base64");

    const options = {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    };

    const response = await fetch(url, options);
    const res = await response.json();
    if (!response.ok) {
      throw {
        statusCode: response.status,
        message: `Failed to fetch Fashion Assistant token: ${res.error_description}`,
      };
    }
  } catch (error) {
    console.log(
      `Failed to fetch Fashion Assistant token: ${JSON.stringify(error)}`
    );
    if (error.statusCode === 500)
      throw new Error(
        `Failed to fetch Fashion Assistant token: ${
          error.message || error.toString()
        }`
      );
    throw error;
  }
};

const getProducts = async (token) => {
  const url = `${FASHION_ASSISTANT_BASE_URL}/products`;
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const res = await response.json();
    if (!response.ok) {
      throw {
        statusCode: response.status,
        message: `Failed to fetch Fashion Assistant products: ${res.error_description}`,
      };
    }
    return res;
  } catch (error) {
    console.log(
      `Failed to fetch Fashion Assistant products: ${JSON.stringify(error)}`
    );
    if (error.statusCode === 500)
      throw new Error(
        `Failed to fetch Fashion Assistant products: ${
          error.message || error.toString()
        }`
      );
    throw error;
  }
};

const getProductsDetails = async (token, products) => {
  let productDetails = [];
  for (const product of products) {
    const promiseProductDetail = axios.get(
      `${FASHION_ASSISTANT_PRODUCTS_BASE_URL}/products/${product.id}/products-detail`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const promiseProductPrice = axios.get(
      `${FASHION_ASSISTANT_PRODUCTS_BASE_URL}/products/${product.id}/prices`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const [productDetail, productPrice] = await Promise.all([
      promiseProductDetail,
      promiseProductPrice,
    ]);

    const productData = {
      ...productDetail.data,
      ...productPrice.data,
    };

    const formattedProduct = parseProductDetail(productData);
    productDetails.push(formattedProduct);
  }
  return productDetails;
};

export async function handler(event) {
  try {
    const fashionAssistantToken = await getToken();
    const products = await getProducts(fashionAssistantToken);
    const productDetails = await getProductsDetails(
      fashionAssistantToken,
      products
    );
    return {
      statusCode: 200,
      body: JSON.stringify(productDetails),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
