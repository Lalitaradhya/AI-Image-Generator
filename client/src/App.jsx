import React from 'react'
import {BrowserRouter, Link,Route, Routes} from 'react-router-dom';
import {logo, logo2} from './assets';
import { Home,CreatePost } from './pages';
const App = () => {
  return (
  <BrowserRouter>
  <header className='w-full flex justify-between items-center bg-white sm:px-8 px--4 py-4 border-b border-b-[#e6ebf4]'>
    <Link to="/">
      <img src={logo2} alt="logo" className='w-36' />
      <img src={logo} alt="logo" className='w-28 ml-12' />
    </Link>
    <Link to="/create-post" className='font-inter font-medium bg-[#0070ad] text-white px-5 py-3 rounded-md'>Create</Link>
  </header>
  <main className='sm:p-8 px-4 py-8- w-full bg-[#E5E4E2] min-h-[calc (100vh-73px)]'>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create-post' element={<CreatePost />} />
     </Routes>
  </main>
  </BrowserRouter>
  )
}

export default App