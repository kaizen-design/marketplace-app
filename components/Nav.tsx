import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { useContext } from "react";
import { Context } from "../context";

const navLinkStyle = `cursor-pointer inline-flex items-center px-1 pt-1 text-gray-500 hover:text-indigo-400`

const iconButtonStyle = `flex bg-white p-2 px-4 rounded-full text-gray-400 hover:text-indigo-400 border-2 border-gray-500 hover:border-indigo-400`

export default function Nav() {
  const { user, isLoading } = useUser();
  const { state } = useContext(Context as any);
  
  const { cart } = state;
  let itemCount = 0;

  for (const [key, value] of Object.entries(cart)) {
    itemCount = itemCount + cart[key].qty
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="ml-6 flex space-x-8">
              <Link href="/">
                <a className={navLinkStyle}>Home</a>
              </Link>
            </div>
          </div>

          <div className="ml-6 flex items-center">
            <Link href="/cart">
              <button className={iconButtonStyle}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {` ${itemCount} Item${itemCount !== 1 ? 's' : ''}`}
              </button>
            </Link>
            { 
              !isLoading ?
                !user ? (
                  <a href='/api/auth/login' className='rounded-md border bg-purple-100 px-2 py-3 mr-2 ml-3'>
                    Login as Vendor
                  </a>
                ) : (
                  <>
                    <img 
                      className='rounded-full h-8 w-8 ml-2' 
                      src={user.picture || ''} 
                      alt={user.name || ''} />
                    <span className='ml-2 mr-2'>{user.name}</span>
                    <Link href='/manage-shops/'>
                      <a className='my-1 rounded-md bg-indigo-100 px-4 py-2 text-indigo-700 hover:bg-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-2'>
                        Manage Shops
                      </a>
                    </Link>                    
                    <a href='/api/auth/logout' className='my-1 rounded-md bg-indigo-100 px-4 py-2 text-indigo-700 hover:bg-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-2'>
                      Logout
                    </a>
                  </>
                ) : ''
            }
          </div>
        </div>
      </div>
    </nav>
  )
}