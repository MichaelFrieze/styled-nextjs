export const PRODUCT_QUERY = `query {
  products {
    data {
      attributes {
        description
        title
        slug
        price
        image {
          data {
            attributes {
              formats
            }
          }
        }
      }
    }
  }
}
`;