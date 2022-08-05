import { useContext } from "react";
import { Context } from "../context";

export default function Cart() {
  const { state } = useContext(Context as any);
  const { cart } = state;
  
  let total = 0;
  for ( const [key, value] of Object.entries(cart) ) {
    total = total + cart[key].price * cart[key].qty
  }

  return (
    <div className="py-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Your Shopping Cart</h1>
      <ul role="list" className="my-6 divide-y divide-gray-200">
        {
          Object.entries(cart).map(([key, value]) => {
            return (
              <CartItem key={cart[key]._id} data={cart[key]} />
            )
          })
        }
      </ul>
      <div className="my-6">
        <div className="text-lg">Total <b className="font-semibold">${total}</b></div>
        <a href="#" className="mt-4 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white">Checkout</a>
      </div>
    </div>
  )
}

function CartItem(data: any) {  
  const { data: item } = data;
  const { dispatch } = useContext(Context as any);
  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 rounded-md border border-gray-200">
        <img src={item.imageUrl ? item.imageUrl : defaultImg}  className="h-full w-full object-cover object-center" />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.name}</h3>
            <p className="ml-4">${item.price}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{item.description}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {item.qty}</p>
          <div className="flex">
            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => {
              dispatch({ type: 'REMOVE_FROM_CART', payload: item })
            }}>Remove</button>
          </div>
        </div>
      </div>
    </li>
  )
}

const defaultImg = "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg";