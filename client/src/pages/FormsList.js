import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../Api';
import { AiFillEye } from 'react-icons/ai';
import Header from '../components/Header';

const FormsList = () => {

  const [formsList, setFormsList] = useState([]);

  useEffect(() => {
    getAllForms();
  }, [])

  const getAllForms = async () => {
    const response = await axiosInstance.get(`/api/form/getAllForms`);
    console.log(response.data);
    setFormsList(response.data);
  }

  return (
    <div>
      <Header />
    <div className='w-full p-10'>
      <h1 className='text-2xl font-medium '>Forms List</h1>
      <div className='flex flex-col overflow-x-auto shadow-md'>
        <table className='mt-6 '>
          <thead className='text-left bg-[#115C88] text-white h-8'>
            <tr>
              <th className='p-2 px-4 text-base font-medium'>Index</th>
              <th className='p-2 text-base font-medium'>Title</th>
              <th className='p-2 text-base font-medium'>Description</th>
              <th className='p-2 text-base font-medium'>Preview</th>
            </tr>
          </thead>
          {
            formsList.length > 0
            &&
            <tbody>
              {
                formsList.map((form, index) => {
                  const { title, description, _id } = form;

                  return (
                    <>
                      <tr className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} text-sm py-2`}>
                        <td className='p-2 px-4'>{index+1}</td>
                        <td className='p-2 capitalize'>{title}</td>
                        <td className='p-2'>{description}</td>
                        <td className='p-2 flex flex-row items-center justify-start gap-3 text-center'>
                          <Link className='cursor-pointer px-3 py-2 box-border' to={"/form-preview/" + _id} target="_blank">
                            <AiFillEye className='w-5 h-5 fill-[#115C88] ' />
                          </Link>
                        </td>
                      </tr>
                    </>
                  );
                })
              }
            </tbody>
          }
        </table>
      </div>
    </div>
    </div>
  )
}

export default FormsList;