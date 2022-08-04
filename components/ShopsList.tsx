import Link from "next/link";

export default function ShopsList({ shops }: { shops: any }) {
  return (
    <div className="pb-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Your Shops List</h1>
      {
        shops.map((shop: any) => (
          <div key={shop._id} className="rounded-lg bg-white border-2 mb-1 hover:bg-gray-100">
            <ul className="divide-y divide-gray-100">
              <li className="flex justify-between items-center p-3">
                <h2 className="text-lg">{shop.name}</h2>
                <div>
                  <Link href={`/shops/${shop._id}/products`}>
                    <a className={btnClass}>Add Product</a>
                  </Link>  
                  <button className={deleteBtn}>Delete Shop</button>
                </div>
              </li>
            </ul>
          </div>
        ))
      }
    </div>
  )
}

const btnClass = `my-1 rounded-md bg-indigo-100 px-4 py-2 text-indigo-700 hover:bg-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`;
const deleteBtn = `my-1 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-700 focus:ring-offset-2 ml-3`