import React, { useEffect, useState } from 'react'

const Comprehension = ({ index, passage, questions, handleFormResponse }) => {

  const [selectedOptions, setSelectedOptions] = useState({});

  const handleCorrectOptionSelection = (questionText, option) => {
    setSelectedOptions((selectedOptions) => (
      {
        ...selectedOptions,
        [questionText]: option,
      }
    ))
    console.log(selectedOptions);
  }
  useEffect(() => {
    console.log(selectedOptions);
    handleFormResponse({
      index: index,
      type: 'comprehension',
      passage: passage,
      responses: {...selectedOptions},
    })
  },[selectedOptions])

  return (
    <div className='w-full h-auto p-6 shadow border-[1px] border-solid border-[#b6b5b5] flex flex-col items-start gap-6 rounded'>
      <div className='w-full h-auto p-2'>
        {passage}
      </div>
      <div className='flex flex-col items-start gap-4 ml-6'>
        {
          questions.map((question, index) => {
            const { optionsList, text } = question;
            return (
              <div className='flex flex-col items-start gap-4'>
                <section>
                  {index + 1}. {text}
                </section>
                <section>
                  {
                    optionsList.map((option, optionIndex) => {
                      return (
                        <div className='flex flex-row items-center justify-start gap-2'>
                          <input className='w-[14px] h-[14px] cursor-pointer' name={text} type="radio" value={option} onChange={(e) => { handleCorrectOptionSelection(text, option) }} />
                          <label>{option}</label>
                        </div>
                      )
                    })
                  }
                </section>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Comprehension;