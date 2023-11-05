import React, { useState } from 'react'

const Comprehension = () => {

  const [passage, setPassage] = useState();
  const [comprehensionQuestions, setComprehensionQuestions] = useState([{
    text: '',
    optionsList: ['', ''],
    correctOption: '',
  }]);

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

  const handleRemoveOption = () => {

  }

  return (
    <div>
      <textarea type="text" value={passage} onChange={(e) => setPassage(e.target.value)} />
      <div>
        {
          comprehensionQuestions.map((questionDetails, index) => {
            const { text, optionsList, correctOption } = questionDetails;
            return (
              <div>
                <textarea type='text' value={text} onChange={(e) => handleChangeQuestionText(e, index)} />
                <div>
                  {
                    optionsList.map((option, optionIndex) => {
                      return (
                        <label>
                          <input name={text} type="radio" value={option} onChange={(e) => { handleCorrectOptionSelection(e, index, optionIndex) }} />
                          <input type="text" value={option} onChange={(e) => handleUpdateOptionText(e, index, optionIndex)} />
                        </label>
                      )
                    })
                  }
                </div>
                <button>
                  Add more options
                </button>
              </div>
            )
          })
        }
      </div>
      <button onClick={handleAddComprehensionQuestion}>
        Add Question
      </button>
    </div>
  )
}

export default Comprehension;