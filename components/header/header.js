import Link from 'next/link'
import { useState } from 'react'

export default function Header(navigation) {
  const [mobileMenuOpen, setActive] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    setActive(!mobileMenuOpen);
  };

  return (
    <header className="flex flex-row justify-between space-x-4">
      <div className="logoContainer mt-6 mb-6">
        <Link href="/">
          <a><img src="/images/logo.png" className="md:pr-8" /></a>
        </Link>
      </div>
      <button className="inline-block md:hidden w-8 h-8 bg-transparent text-gray-600 p-1 mt-6 mb-6" onClick={handleClick}>
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
      </button>
      <nav className={mobileMenuOpen ? 'flex absolute md:relative top-16 left-0 md:top-0 z-20 md:flex flex-col md:flex-row md:space-x-6 font-semibold w-11/12 md:w-auto bg-white shadow-md rounded-lg md:rounded-none md:shadow-none md:bg-transparent p-6 pt-0 md:p-0 mt-24' : 'hidden absolute md:relative top-16 left-0 md:top-0 z-20 md:flex flex-col md:flex-row md:space-x-6 font-semibold w-full md:w-auto bg-white shadow-md rounded-lg md:rounded-none md:shadow-none md:bg-transparent p-6 pt-0 md:p-8'}>
        <Link href="/recipes"><a className={mobileMenuOpen ?' text-gray-600 hover:underline' : 'text-white hover:underline'}><h3>Recipes</h3></a></Link>
        <Link href="/plan"><a className={mobileMenuOpen ?' text-gray-600 hover:underline' : 'text-white hover:underline'}><h3>Meal Plan</h3></a></Link>
        <Link href="/list"><a className={mobileMenuOpen ?' text-gray-600 hover:underline' : 'text-white hover:underline'}><h3>Shopping List</h3></a></Link>
      </nav>
      <div className='flex flex-col md:flex-row md:space-x-6 md:w-auto'>
        <Link href="/account"><img src="/icons/user.svg" height="24" width="24" /></Link>
        <Link href="/list"><img src="/icons/list.svg" height="24" width="24" /></Link>
        <Link href="/plan"><img src="/icons/calendar.svg" height="24" width="24" /></Link>
      </div>
    </header>
    
  )
}