import React from 'react'

const Navbar = () => {
  return (
    <div className='flex bg-[#120052] p-5 justify-between text-white items-center'>
        <h1 className='text-2xl font-[600] text-white'>Vibo<span className='text-[#ff6600]'>Coditer</span></h1>
        <ul className='flex gap-5 text-lg'>
            <li>Home</li>
            <li>About</li>
            <li>Pricing</li>
            <li>Services</li>
        </ul>
        <div className='flex gap-5'>
            <button className='bg-amber-50 text-black px-5 py-2 rounded-[50px]'>Login</button>
            <button className='bg-amber-50 text-black px-5 py-2 rounded-[50px]'>Sign Up</button>
        </div>
    </div>
  )
}

export default Navbar