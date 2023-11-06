import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Api';
import Categorize from '../components/questions-type/Categorize';
import Cloze from '../components/questions-type/Cloze';
import Comprehension from '../components/questions-type/Comprehension';
import { BsCardImage } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';

const CreateForm = () => {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questions: [],
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectOption, setSelectOption] = useState("select");
  const [formSubmitted, setFormSubmitted] = useState({ value: false });
  const [questionSubmitted, setQuestionSubmitted] = useState();
  const [isError, setIsError] = useState({ title: true });

  const navigate = useNavigate();


  useEffect(() => {
    console.log(isError);
  }, [isError])

  useEffect(() => {
    console.log(isError);
    if ((!(Object.values(isError).some((error) => error === true)) && Object.keys(isError).length > 1)) {
      createForm();
    }
  }, [formSubmitted])

  const handleQuestionUpdate = (updatedQuestion) => {

    console.log(updatedQuestion);
    setFormData((prevData) => {
      const { questions } = prevData;
      const index = questions.findIndex((question, index) => index === updatedQuestion.id);

      if (index !== -1) {

        const updatedQuestions = [...questions];
        updatedQuestions[index] = updatedQuestion;

        return { ...prevData, questions: updatedQuestions };
      } else {
        return { ...prevData, questions: [...questions, updatedQuestion] };
      }
    });
  };

  const handleSelectOption = (e) => {

    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions, { type: e.target.value, id: prevData.questions.length }];
      return { ...prevData, questions: updatedQuestions }
    })

    setIsError((isError) => {
      return { ...isError, [formData.questions?.length]: true }
    })
    setSelectOption('select')
  }

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  }

  const handleError = (error) => {
    setIsError((prevError) => ({
      ...prevError,
      ...error
    }))
  }

  const handleSubmitForm = () => {
    setFormSubmitted({ value: true });
    console.log('Form Data:', formData);
  };

  const createForm = async () => {
    const response = await axiosInstance.post(`/api/form`, formData);
    console.log(response);
    navigate("/", { replace: true });
  }

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))

    if (name === 'title' && value !== '') {
      setIsError((isError) => {
        return { ...isError, title: false }
      })
    } else if (name === 'title' && value === '') {
      setIsError((isError) => {
        return { ...isError, title: true }
      })
    }
  }

  const handleRemoveQuestion = (index) => {

    setFormData((prevData) => {
      const { questions } = prevData;
      const updatedQuestions = [...questions];

      updatedQuestions.splice(index, 1);

      return { ...prevData, questions: updatedQuestions }
    })
  }

  return (
    <div className='flex flex-col items-center justify-normal gap-4 w-[1100px] h-auto mx-auto my-8 py-7 shadow-lg border-[1px] border-solid border-[#cecaca] rounded'>
      <div className='flex flex-col items-start gap-10 w-full px-10'>
        <section className='flex flex-row items-center justify-around w-full'>
          <div className='flex flex-col items-start gap-3 w-[80%]'>
            <span className='font-medium text-xl tracking-wide text-[#4d4949]'>Form Details</span>

            <input required placeholder='Title' name='title' type='text' value={formData.title} onChange={(e) => handleTextChange(e)} className='text-base p-3 pl-1 w-full border-b-[1px] border-solid border-[#8b8787] outline-none focus:border-[#1ac914]' />

            <input placeholder='Description' name='description' type='text' value={formData.description} onChange={(e) => handleTextChange(e)} className='text-base p-3 pl-1 w-full border-b-[1px] border-solid border-[#8b8787] outline-none focus:border-[#1ac914]' />
          </div>
          <label role="button" id="form-image" className="flex flex-col justify-center items-start text-[#4d4949] mt-8">
            <input
              type="file"
              id="form-image"
              onChange={handleImageChange}
              className="hidden"
            />
            <BsCardImage className='w-14 h-14' />
            Upload
          </label>
        </section>
        <div className='w-full h-[1px] bg-[#b6b4b4] mt-6 '></div>
        <div className='mx-auto text-xl font-medium text-[#414141] '>Add Questions</div>
        {
          formData.questions.length > 0
          &&
          <div className='w-full flex flex-col items-start justify-normal gap-10'>
            {
              formData.questions?.map((question, index) => {
                if (question.type === 'categorize') {
                  return (
                    <div className='flex flex-col w-full items-center'>
                      <Categorize index={index} onUpdate={handleQuestionUpdate} formSubmitted={formSubmitted} handleError={handleError} />
                      <button className='px-3 py-1 uppercase' onClick={() => handleRemoveQuestion(index)}>
                        <AiFillDelete className='w-7 h-7 fill-red-500' />
                      </button>
                    </div>
                  )
                } else if (question.type === 'cloze') {
                  return (
                    <div className='flex flex-col w-full items-center'>
                      <Cloze index={index} onUpdate={handleQuestionUpdate} formSubmitted={formSubmitted} handleError={handleError} />
                      <button className=' px-3 py-1 uppercase' onClick={() => handleRemoveQuestion(index)}>
                        <AiFillDelete className='w-7 h-7 fill-red-500' />
                      </button>
                    </div>
                  )
                } else if (question.type === 'comprehension') {
                  return (
                    <div className='flex flex-col w-full items-center'>
                      <Comprehension index={index} onUpdate={handleQuestionUpdate} formSubmitted={formSubmitted} handleError={handleError} />
                      <button className=' px-3 py-1 uppercase' onClick={() => handleRemoveQuestion(index)}>
                        <AiFillDelete className='w-7 h-7 fill-red-500' />
                      </button>
                    </div>
                  )
                }
              })
            }
          </div>
        }
        <div className='w-full flex items-end justify-end mt-6 mr-6'>
          <select className='cursor-pointer outline-none p-4 bg-white border-[1px] border-solid border-[#6d6a6a]' value={selectOption} onChange={e => handleSelectOption(e)} >
            <option className='p-2' value="select" disabled>Select Question to Add</option>
            <option className='p-2' value="categorize">Categorize</option>
            <option className='p-2' value="cloze">Cloze</option>
            <option className='p-2' value="comprehension">Comprehension</option>
          </select>
        </div>
      </div>
      {
        formData.questions.length > 0 &&
        <button className='text-white bg-[#236572] mt-2 border-[1px] border-solid border-[#b6b5b5] px-4 py-2 uppercase' onClick={handleSubmitForm}>
          Submit
        </button>
      }
    </div>
  )
}

export default CreateForm;