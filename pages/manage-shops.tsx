import NewShopForm from "../components/NewShopForm";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { gql, useQuery } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import ShopsList from "../components/ShopsList";

const GET_SHOPS_BY_OWNER_ID = gql`
  query getShopsByOwnerId($ownerID: String!) {
    getShopsByOwnerId(ownerID: $ownerID) {
      data {
        _id
        name
      }
    }
  }
`;

export default function ManageShops(props: any) {
  const { user } = useUser();
  const { data, loading } = useQuery(GET_SHOPS_BY_OWNER_ID, {
    variables: {
      ownerID: user?.sub
    }
  });
  if (loading) return <p>Loading...</p>; 
  console.log(data)
  return (
    <>
      <NewShopForm accessToken={props.accessToken} />
      {
        !loading && data ? 
          <ShopsList shops={data.getShopsByOwnerId.data} /> : 
          ''
      }
    </>  
  )
}

export async function getServerSideProps(ctx: any) {
  const { accessToken } = await getAccessToken(ctx.req, ctx.res);  
  return {
    props: { 
      accessToken,
    }
  }
}