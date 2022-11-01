import Head from 'next/head';
import { PRODUCT_QUERY } from '../lib/query';
import { useQuery } from 'urql';
import Product from '../components/Product';

export default function Home() {
  //Fetch products from strapi
  const [results] = useQuery({ query: PRODUCT_QUERY });
  const { data, fetching, error } = results;

  //Checks for the data coming in
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  const products = data.products.data;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hello Next.js</h1>
        {products.map((product) => (
          <Product key={product.attributes.slug} product={product} />
        ))}
      </main>
    </div>
  );
}
