import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

const GET_SHOP_BY_ID = gql`
  query GetShop($shopId: ID!) {
    findShopByID(id: $shopId) {
      _id
      name
      description
      products {
        data {
          _id
          name
        }
      }
    }
  }
`;

export default function ShopDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useQuery(GET_SHOP_BY_ID, {
    variables: {
      shopId: id
    }
  });

  
  return (    
    <>
      {
        !loading ? 
          <div className="py-10 max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">{data.findShopByID.name}</h1>
            <p className="text-gray-500">{data.findShopByID.description}</p>
            {data.findShopByID.products.data.map( (product: any) => (
              <div key={product._id} className="rounded-lg bg-white border-2 mb-1 hover:bg-gray-100 mt-8">
                <ul className="divide-y divide-gray-100">
                  <li className="flex justify-between items-center p-3">                    
                    <span className="text-lg">{product.name}</span>                    
                    <div>                      
                      <button className={btnClass}>Edit</button>                      
                      <button className={deleteBtn}>Delete</button>
                    </div>
                  </li>
                </ul>
              </div>
            ))}
          </div>   : 
          ""
      } 
    </>   
  )
}

const btnClass = `my-1 rounded-md bg-indigo-100 px-4 py-2 text-indigo-700 hover:bg-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`;
const deleteBtn = `my-1 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-700 focus:ring-offset-2 ml-3`