import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../Api';
import Categorize from '../components/form-preview/question-type/Categorize';
import Cloze from '../components/form-preview/question-type/Cloze';
import Comprehension from '../components/form-preview/question-type/Comprehension';

const FormLink = () => {

  const { id } = useParams();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [questions, setQuestions] = useState();
  const [formSubmitted, setFormSubmitted] = useState({ value: false });
  const [formResponse, setFormResponse] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getFormData();
  }, [id])

  const getFormData = async () => {
    const response = await axiosInstance.get(`/api/form/preview/${id}`);
    console.log(response.data);
    setTitle(response.data.title);
    setDescription(response.data.description);
    setQuestions(response.data.questions);
  }

  const handleFormResponse = (response) => {
    setFormResponse((formResponse) => {
      const responseIndex = formResponse.findIndex((res) => res.index === response.index)

      if (responseIndex !== -1) {
        const updatedResponse = [...formResponse];
        updatedResponse[responseIndex] = response;
        return updatedResponse;
      }
      else return [...formResponse, response];
    }
    )
  }

  const handleSubmitForm = async () => {
    try {
      const response = await axiosInstance.post(`/api/form/submit/${id}`, formResponse);
      console.log(response);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex flex-col items-center justify-normal gap-4 w-[1100px] h-auto mx-auto my-8 py-7 shadow-lg border-[1px] border-solid border-[#cecaca] rounded'>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-2xl font-medium text-[#414141]'>{title}</h1>
        <p className='text-base font-normal text-[#414141]'>{description}</p>
      </div>
      <div className='w-[80%] flex flex-col items-center gap-6'>
        {
          questions?.map((question, index) => {
            const { type } = question;
            if (type === 'categorize') {
              const { items, categories } = question;
              return (
                <Categorize index={index} type={type} items={items} categories={categories} handleFormResponse={handleFormResponse} />
              )
            }
            else if (type === 'comprehension') {
              const { passage, questions } = question;
              return (
                <Comprehension index={index} type={type} passage={passage} questions={questions} handleFormResponse={handleFormResponse} />
              )
            }
            else if (type === 'cloze') {
              const { options, preview } = question
              return (
                <Cloze index={index} type={type} options={options} preview={preview} handleFormResponse={handleFormResponse}/>
              )
            }
          })
        }
      </div>
      <button className='text-white bg-[#236572] mt-2 border-[1px] border-solid border-[#b6b5b5] px-4 py-2 uppercase' onClick={handleSubmitForm}>
        Submit
      </button>
    </div>
  )
}

export default FormLink;