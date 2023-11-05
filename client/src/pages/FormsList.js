import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosInstance from '../Api';

const FormsList = () => {

  const [formsList, setFormsList] = useState([]);

  useEffect(() => {
    getAllForms();
  },[])

  const getAllForms = async () => {
    const response = await axiosInstance.get(`/api/form/getAllForms`);
    console.log(response.data);
    setFormsList(response.data);
  }

  return (
    <div>
      {
        formsList.map((form) => {
          const { title, description, _id } = form;
          return (
            <div>
              <span>
                {title}
              </span>
              <span>
                {description}
              </span>
              <Link to={"/form-preview/" + _id} target="_blank">
                Preview
              </Link>
            </div>
          )
        })
      }
    </div>
  )
}

export default FormsList;