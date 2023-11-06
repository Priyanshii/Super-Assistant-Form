import React, { useEffect, useState } from 'react'
import { AiOutlineClose, AiFillDelete } from 'react-icons/ai';

const Comprehension = ({ index, onUpdate, formSubmitted, handleError }) => {

  const [passage, setPassage] = useState('');
  const [comprehensionQuestions, setComprehensionQuestions] = useState([{
    text: '',
    optionsList: ['', ''],
    correctOption: '',
  }]);
  const [error, setError] = useState({});

  useEffect(() => {
    if (formSubmitted.value) {
      setError({});
      const question = {};
      let error = false;

      if (passage.length === 0) {
        error = true;
        setError((prevError) => ({
          ...prevError,
          noPassage: 'Please add Passage'
        }))
      }
      else {
        comprehensionQuestions.forEach((question, index) => {
          if (question.text === '') {
            error = true;
            setError((prevError) => ({
              ...prevError,
              [`noQuestion${index}`]: 'Please Enter a question'
            }))
          }
          if (question.correctOption === '') {
            error = true;
            setError((prevError) => ({
              ...prevError,
              [`noCorrectOption${index}`]: 'Select the Correct option'
            }))
          }
          if (question.optionsList[0] === '' || question.optionsList[1] === '') {
            error = true;
            setError((prevError) => ({
              ...prevError,
              [`noOption${index}`]: 'Please add at least two options'
            }))
          }
        })
      }
      console.log(error);

      if (error === false) {
        question['id'] = index;
        question['type'] = 'comprehension'
        question['passage'] = passage;
        question['questions'] = comprehensionQuestions;
        console.log(question);
        setError({});
        onUpdate(question);
        handleError({ [index]: false });
      }
    }
  }, [formSubmitted])

  const handleChangeQuestionText = (e, index) => {
    setComprehensionQuestions((comprehensionQuestions) => {
      const updatedComprehensionQuestions = comprehensionQuestions.map((questionDetail, i) => {
        if (i === index) {
          return { ...questionDetail, text: e.target.value };
        }
        return questionDetail;
      });
      return updatedComprehensionQuestions;
    });
  }

  const handleAddComprehensionQuestion = () => {
    setComprehensionQuestions((comprehensionQuestions) => (
      [...comprehensionQuestions, { text: '', optionsList: ['', ''], correctOption: '' }]
    ));
  }

  const handleCorrectOptionSelection = (e, index) => {
    setComprehensionQuestions((comprehensionQuestions) => {
      const updatedComprehensionQuestions = comprehensionQuestions.map((questionDetail, i) => {
        if (i === index) {
          return { ...questionDetail, correctOption: e.target.value };
        }
        return questionDetail;
      });
      return updatedComprehensionQuestions;
    });
  }

  const handleUpdateOptionText = (e, index, optionIndex) => {
    setComprehensionQuestions((comprehensionQuestions) => {
      const updatedComprehensionQuestions = comprehensionQuestions.map((questionDetail, i) => {
        if (i === index) {
          return {
            ...questionDetail,
            optionsList: questionDetail.optionsList.map((option, oIndex) => {
              if (oIndex === optionIndex) {
                return e.target.value;
              } else {
                return option;
              }
            }),
          };
        }
        return questionDetail;
      });
      return updatedComprehensionQuestions;
    });
  }

  const handleAddMoreOptions = (index) => {
    const updatedQuestions = [...comprehensionQuestions];

    // Update the optionsList of the specific question at the given index
    updatedQuestions[index].optionsList.push('');

    // Update the state with the modified copy of the comprehensionQuestions array
    setComprehensionQuestions(updatedQuestions);
  }

  const handleRemoveOption = (index, optionIndex) => {

    if (comprehensionQuestions[index].optionsList.length > 2) {
      setComprehensionQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];

        const questionToUpdate = updatedQuestions[index];

        if (questionToUpdate) {
          const updatedQuestion = { ...questionToUpdate };
          updatedQuestion.optionsList.splice(optionIndex, 1);
          updatedQuestions[index] = updatedQuestion;
          return updatedQuestions;
        }
        return prevQuestions;
      });
    }
  }


  const handleRemoveQuestion = (index) => {

    setComprehensionQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions]
      updatedQuestions.splice(index, 1);

      return updatedQuestions;
    })
  }


  return (
    <div className='w-full h-auto p-6 shadow border-[1px] border-solid border-[#b6b5b5] flex flex-col items-start gap-6'>
      <textarea
        className='border-[1px] w-full border-solid border-[#b6b5b5] rounded p-2 outline-none'
        placeholder='Type Passage here'
        type="text" value={passage} onChange={(e) => setPassage(e.target.value)} />
      {formSubmitted && error?.noPassage && <p className=' text-sm text-red-500'>{error?.noPassage}</p>}
      <div className='w-full flex flex-col items-start gap-6'>
        {
          comprehensionQuestions.map((questionDetails, index) => {
            const { text, optionsList, correctOption } = questionDetails;
            return (
              <div className='flex flex-col gap-4 w-full'>
                <div className='w-full flex items-center justify-between mr-4'>
                  <span className='text-lg ml-4 text-[#414141]'>Question {index + 1}.</span>
                  {
                    comprehensionQuestions.length > 1
                    &&
                    <button className='px-3 py-1 uppercase' onClick={() => handleRemoveQuestion(index)}>
                      <AiFillDelete className='w-7 h-7 fill-red-500' />
                    </button>
                  }
                </div>
                <div className='flex flex-col items-start justify-normal gap-5 ml-4'>
                  <section className='flex flex-row items-center justify-between gap-2'>
                    <textarea
                      className='border-[1px] w-full border-solid border-[#b6b5b5] rounded p-2 outline-none'
                      placeholder='Question Text' type='text' value={text} onChange={(e) => handleChangeQuestionText(e, index)} />

                  </section>
                  {formSubmitted && error?.[`noQuestion${index}`] && <p className='text-sm text-red-500'>{error?.[`noQuestion${index}`]}</p>}
                  <div className='flex flex-col items-start justify-normal gap-5 ml-4'>
                    {
                      optionsList.map((option, optionIndex) => {
                        return (
                          <div className='flex flex-row items-center gap-2'>
                            <label className='flex flex-row items-center gap-2' >
                              <input className='w-[20px] h-[20px] cursor-pointer' name={text} type="radio" value={option} onChange={(e) => { handleCorrectOptionSelection(e, index, optionIndex) }} />
                              <input
                                className='border-[1px] border-solid border-[#b6b5b5] rounded p-2 outline-none'
                                placeholder={`Option ${optionIndex + 1}`} type="text" value={option} onChange={(e) => handleUpdateOptionText(e, index, optionIndex)} />
                            </label>
                            {
                              optionsList.length > 2
                              &&
                              <button className='p-1' onClick={() => { handleRemoveOption(index, optionIndex) }}>
                                <AiOutlineClose />
                              </button>
                            }
                          </div>
                        )
                      })
                    }
                    {formSubmitted && error?.[`noCorrectOption${index}`] && <p className=' text-sm text-red-500'>{error?.[`noCorrectOption${index}`]}</p>}
                    {formSubmitted && error?.[`noOption${index}`] && <p className=' text-sm text-red-500'>{error?.[`noOption${index}`]}</p>}
                  </div>
                  <button className='text-white bg-[#2d8394] mt-2 border-[1px] border-solid border-[#b6b5b5] px-2 py-1' onClick={() => handleAddMoreOptions(index)}>
                    Add more options
                  </button>
                </div>
              </div>
            )
          })
        }
      </div>
      <button className='text-white font-medium bg-[#2d8394] mt-2 border-[1px] border-solid border-[#b6b5b5] px-3 py-2' onClick={handleAddComprehensionQuestion}>
        Add Question
      </button>
    </div>
  )
}

export default Comprehension;