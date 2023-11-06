import React from 'react'
import { Link } from 'react-router-dom'
import { HiPlus } from 'react-icons/hi';

const Header = () => {
  return (
    <div className='sticky top-0 z-10 p-6 bg-white w-full h-auto border-b-[1px] border-solid border-[#f0eeee]'>
      <div className='flex flex-row items-center justify-between'>
      <section className=' text-2xl font-medium text-gray-800 uppercase'>
        Super.Form
      </section>
      <Link to={'/create'} target="_blank" className='flex flex-row items-center gap-2 px-4 py-2 ml-2 bg-[#156da0] hover:bg-[#11547a] rounded-md text-white'>
        <HiPlus className='fill-white stroke-[1px] stroke-white' />
        Create Form
      </Link>
      </div>
    </div>
  )
}

export default Header