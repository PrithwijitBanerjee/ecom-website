import { baseUrl } from "../Components/Commons/BaseUrl";

const HeaderMenuQuery = `
    {
      categoryList(filters:{ids:{eq:"467"}}){
        uid,
        name,
        id,
        level,
        children_count
        children {
          id
          level
          name
          path
          url_path
          url_key
          image
          description
          children {
            id
            level
            name
            path
            url_path
            url_key
            image
            description
          }
        }
      }
    }`;

// Query to Fetch Dynamic Menu...................
export const fetchMenu = async () => {
  try {
    // Perform an API call to fetch products
    // Replace this with your actual API endpoint and fetch logic
    const response = await fetch(baseUrl, {
      //Data fetching from graphQl API using fetch API in JS....
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: HeaderMenuQuery }),
    });

    if (!response?.ok) {
      throw new Error("Network response was not ok.");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error?.message); // Throw an error if the API call fail
  }
};

//Query to Fetch filter price products.....
export const fetchPriceProducts = async (fromValue, toValue) => {
  try {
    const query = `
      query {
        products(
          filter: {
            price: {
              from: "${fromValue}"
              to: "${toValue}"
            }
          }
          pageSize: 200
        ) {
          items {
            id
            name
            sku
            url_key
            price {
              regularPrice {
                amount {
                  value
                  currency
                }
              }
            }
            image {
              url
            }
          }
        }
      }
    `;
    const response = await fetch(baseUrl, {
      //Data fetching from graphQl API using fetch API in JS....
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data.data.products.items;
  } catch (error) {
    throw new Error(error.message);
  }
};

//Query to Fetching All Products ..........
export const fetchAllProducts = async () => {
  //local variable....
  const Query = `{
    products(search: "", pageSize: 200) {
      items {
        id
        name
        sku
        url_key
        price {
          regularPrice {
            amount {
              value
              currency
            }
          }
        }
        image {
          url
        }
      }
    }
  }`;
  try {
    const response = await fetch(baseUrl, {
      //Data fetching from graphQl API using fetch API in JS....
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: Query }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    return data?.data?.products?.items;
  } catch (error) {
    console.log("Error while fetching data from API ", error);
    throw error;
  }
};

//Query to Fetch particular product based on url_key.....
export const fetchSingleProduct = async (url_key) => {
  const Query = `
  {
    products(search: "", filter: { url_key: { eq: "${url_key}" } }) {
      items {
        __typename
        id
        name
        sku
        small_image {
          url
        }
        url_key
        price {
          regularPrice {
            amount {
              value
              currency
            }
          }
        }
        image {
          url
        }
        ... on ConfigurableProduct {
          configurable_options {
            label
            values {
              value_index
              label
            }
          }
        }
      }
    }
  }`;

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: Query }),
    });

    if (response.status >= 200 && response.status < 300) {
      const data = await response.json();
      return data?.data?.products?.items[0];
    } else {
      // If response status is not in the success range, handle it as an error
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.log(
      "Error while fetching particular product from GraphQl API: ",
      error
    );
    throw error;
  }
};
