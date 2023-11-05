import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Api';
import Categorize from '../components/questions-type/Categorize';
import Cloze from '../components/questions-type/Cloze';
import Comprehension from '../components/questions-type/Comprehension';

const CreateForm = () => {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questions: [],
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectOption, setSelectOption] = useState("select");
  const [formSubmitted, setFormSubmitted] = useState({value: false});
  const [questionSubmitted, setQuestionSubmitted] = useState()
  const [isError, setIsError] = useState({
    Categorize: true,
    Cloze: true,
    Comprehension: false
  });

  const navigate = useNavigate();

  const handleQuestionUpdate = (updatedQuestion) => {

    console.log(updatedQuestion);
    setFormData((prevData) => {
      const { questions } = prevData;
      const index = questions.findIndex((question) => question.type === updatedQuestion.type);
    
      if (index !== -1) {

        const updatedQuestions = [...questions];
        updatedQuestions[index] = updatedQuestion;

        return { ...prevData, questions: updatedQuestions };
      } else {
        return { ...prevData, questions: [...questions, updatedQuestion] };
      }
    });
  };

  useEffect(() => {
    console.log(formData);
  },[formData])


  const handleSelectOption = (e) => {
    setSelectOption(e.target.value)
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

  useEffect(() => {
    console.log(isError);
    if(!(Object.values(isError).some((error) => error === true))) {
      createForm();
    }
  },[isError])

  const handleSubmitForm = () => {
    setFormSubmitted({value: true});
    console.log('Form Data:', formData);
  };

  const createForm = async() => {
    const response = await axiosInstance.post(`/api/form`, formData);
    console.log(response);
    navigate("/", { replace: true });
  }

  const handleTextChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  return (
    <div>
      <div className="">
        <section>
          title <input name='title' type='text' value={formData.title} onChange={(e) => handleTextChange(e)} />
          desciption <input name='description' type='text' value={formData.description} onChange={(e) => handleTextChange(e)} />
          <label role="button" id="form-image" className="border h-[160px] flex justify-center items-center">
            <input
              type="file"
              id="form-image"
              onChange={handleImageChange}
              className="hidden"
            />
            <span>Upload Form Image</span>
          </label>
        </section>
        <div>
          <select value={selectOption} onChange={e => handleSelectOption(e)} >
            <option value="select" disabled>select...</option>
            <option value="categorize">Categorize</option>
            <option value="cloze">Cloze</option>
            <option value="comprehension">Comprehension</option>
          </select>
        </div>
      </div>
      <Categorize onUpdate={handleQuestionUpdate} formSubmitted={formSubmitted} handleError={handleError}/>
      <Cloze onUpdate={handleQuestionUpdate} formSubmitted={formSubmitted} handleError={handleError}/>
      <button onClick={handleSubmitForm}>
        Submit
      </button>
    </div>
  )
}

export default CreateForm;