import type { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import ProductList from '../components/ProductList';

const GET_PRODUCTS = gql`
  query {
    getAllProducts {
      data {
        _id
        name
        description
        price
        imageUrl
        shop {
          _id
        }
      }
    }
  }
`;

const Home: NextPage = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  if (loading) return <p>Loading...</p>;  
  if (error) return <p>Error :(</p>;  
  console.log(data);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <ProductList products={data.getAllProducts.data} />
    </div>
  )
}

export default Home
