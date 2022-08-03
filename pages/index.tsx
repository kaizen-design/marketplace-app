import type { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';

const GET_SHOP = gql`
  query {
    findShopByID(id: "338699675637908044") {
      _id
      description
      name
      ownerID
      products {
        _id
      }
    }
  }
`;

const Home: NextPage = () => {
  const { data } = useQuery(GET_SHOP);
  console.log(data);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      Home page
    </div>
  )
}

export default Home
