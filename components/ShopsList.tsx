import Link from "next/link";
import { gql, useMutation } from "@apollo/client";
import { httpLink, setAuthToken } from "../gqlClient";

const DELETE_SHOP_AND_PRODUCTS = gql`
  mutation DeleteShopAndProducts($shopID: ID!) {
    deleteShopAndProducts(shopID: $shopID)
  }
`

export default function ShopsList({ shops, accessToken }: { shops: any, accessToken: string }) {

  const [deleteShopAndProducts, { client, data }] = useMutation(DELETE_SHOP_AND_PRODUCTS);

  return (
    <div className="pb-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Your Shops List</h1>
      {
        shops?.length ? shops.map((shop: any) => (
          <div key={shop._id} className="rounded-lg bg-white border-2 mb-1 hover:bg-gray-100">
            <ul className="divide-y divide-gray-100">
              <li className="flex justify-between items-center p-3">
                <Link href={`/shops/${shop._id}/details`}>
                  <a className="text-lg underline text-indigo-700 hover:text-indigo-900">{shop.name}</a>
                </Link>  
                <div>
                  <Link href={`/shops/${shop._id}/products`}>
                    <a className={btnClass}>Add Product</a>
                  </Link>  
                  <button className={deleteBtn} onClick={
                    (e: any) => {
                      e.preventDefault();
                      client.setLink(setAuthToken(accessToken).concat(httpLink));
                      deleteShopAndProducts({
                        variables: {
                          shopID: shop._id
                        }
                      }).then(res => {
                        window.location.reload()
                      }).catch(err => {
                        console.log(err)
                      })
                    }
                  }>Delete Shop</button>
                </div>
              </li>
            </ul>
          </div>
        )) : (
          <p className="text-gray-500">You haven't created any shops yet. Use the form above to create one.</p>
        )
      }
    </div>
  )
}

const btnClass = `my-1 rounded-md bg-indigo-100 px-4 py-2 text-indigo-700 hover:bg-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`;
const deleteBtn = `my-1 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-700 focus:ring-offset-2 ml-3`