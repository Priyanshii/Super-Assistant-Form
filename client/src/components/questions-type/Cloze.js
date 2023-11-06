import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { AiOutlineClose } from 'react-icons/ai';

const modules = {
  toolbar: [
    ['underline'],
  ]
}
const Cloze = ({ index, onUpdate, formSubmitted, handleError }) => {

  const [description, setDescription] = useState();
  const [sentence, setSentence] = useState();
  const [preview, setPreview] = useState('');
  const [clozeOptions, setClozeOptions] = useState([]);
  const [underlinedWords, setUnderlinedWords] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    if (formSubmitted.value) {
      setError({});
      const question = {};
      if (preview === undefined) {
        setError((prevError) => ({
          ...prevError,
          noSentence: "Sentence can't be empty"
        }))
      } else if (underlinedWords.length === 0) {
        setError((prevError) => ({
          ...prevError,
          noUnderline: 'Underline the words to add correct options'
        }))
      }
      if ([...underlinedWords, ...clozeOptions].length < 2) {
        setError((prevError) => ({
          ...prevError,
          optionLength: 'Please add atleast two options'
        }))
      } 
      if (preview !== undefined && underlinedWords.length !== 0 && [...underlinedWords, ...clozeOptions].length >= 2 ) {
        question['id'] = index;
        question['type'] = 'cloze'
        question['preview'] = preview.replace(/<[^>]*>/g, '');
        question['options'] = [...underlinedWords, ...clozeOptions];
        question['correctSequenceOptions'] = underlinedWords;
        console.log(question);
        setError({});
        onUpdate(question);
        handleError({ [index]: false });
      }
    }
  }, [formSubmitted])

  useEffect(() => {
    console.log(sentence);
    const underlineWords = extractUnderlinedWords();
    const preview = handlePreview();
    setUnderlinedWords([...underlineWords]);
    setPreview(preview);
  }, [sentence])

  const handleClozeOptionUpdate = (e, index) => {
    setClozeOptions((clozeOptions) => {
      const updatedClozeOptions = clozeOptions.map((option, i) => {
        if (i === index) {
          return e.target.value;
        }
        return option;
      });
      return updatedClozeOptions;
    });
  }

  const handleAddClozeOption = () => {
    setClozeOptions((clozeOptions) => (
      [...clozeOptions, '']
    ));
  }

  const extractUnderlinedElements = () => {

    const parser = new DOMParser();
    const doc = parser.parseFromString(sentence, 'text/html');

    const underlinedElements = doc.querySelectorAll('u');

    return underlinedElements;
  };

  const extractUnderlinedWords = () => {
    const underlinedElements = extractUnderlinedElements();
    const underlinedWords = Array.from(underlinedElements).map((element) => element.textContent);
    return underlinedWords;
  }

  const handlePreview = () => {
    const underlinedElements = extractUnderlinedElements();
    let preview = sentence;

    Array.from(underlinedElements).forEach((element) => {
      const text = element.textContent;
      preview = preview.replace(`<u>${text}</u>`, `<u>______</u>`);
    });
    return preview;
  }

  const handleRemoveClozeOptions = (index) => {
    if ([...underlinedWords, ...clozeOptions].length > 2) {
      setClozeOptions((options) => {
        return options.filter((item, i) => i !== index);
      });
    }
  }

  return (
    <div className='w-full h-auto p-6 shadow border-[1px] border-solid border-[#b6b5b5] flex flex-col items-start gap-6'>
      <div className='w-full'>
        <input placeholder='Add Description (optional)' name='description' type='text' value={description} onChange={(e) => setDescription(e.target.value)} className='text-base p-3 pl-1 w-full border-b-[1px] border-solid border-[#b6b5b5] outline-none focus:border-[#1ac914]' />
      </div>
      <div className='w-full flex flex-col items-start gap-2'>
        <label>Preview</label>
        <span className='w-full h-[40px] px-2 bg-[#f7f5f5] flex items-center border-[1px] border-solid border-[#b6b5b5] rounded text-base text-[#414141]' dangerouslySetInnerHTML={{ __html: preview }} ></span>
      </div>
      <div className='w-full  flex flex-col items-start gap-2'>
        <label>Sentence</label>
        <ReactQuill style={{ width: '100%' }} placeholder='Underline the words here to convert them into blanks' modules={modules} theme="snow" value={sentence} onChange={setSentence} />
      </div>
      {formSubmitted && error?.noSentence && <p className=' text-sm text-red-500'>{error?.noSentence}</p>}
      {formSubmitted && error?.noUnderline && <p className=' text-sm text-red-500'>{error?.noUnderline}</p>}
      <section className='flex flex-col items-start justify-normal gap-4'>
        {
          underlinedWords.length > 0
          &&
          underlinedWords.map((word, index) => {
            return (
              <div className='flex flex-row items-center gap-2' key={index}>
                <input className='w-[20px] h-[20px]' type="checkbox" checked={true} />
                <input
                  className='border-[1px] border-solid border-[#b6b5b5] rounded p-2 outline-none'
                  type="text" value={word} disabled />
              </div>
            )
          })
        }
        {
          clozeOptions.map((option, index) => {
            return (
              <div className='flex flex-row items-center gap-2' key={index}>
                <input type="checkbox" checked={false} />
                <input
                placeholder={`Option`}
                  className='border-[1px] border-solid border-[#b6b5b5] rounded p-2 outline-none'
                  type="text" value={option} onChange={(e) => handleClozeOptionUpdate(e, index)} />
                {
                  [...clozeOptions, ...underlinedWords].length > 2
                  &&
                  <button className='p-1' onClick={() => { handleRemoveClozeOptions(index) }}>
                    <AiOutlineClose />
                  </button>
                }
              </div>
            )
          })
        }
      </section>
      <button className='text-white bg-[#2d8394] mt-2 border-[1px] border-solid border-[#b6b5b5] px-2 py-1' onClick={handleAddClozeOption}>
        Add Option
      </button>
      {formSubmitted && error?.optionLength && <p className=' text-sm text-red-500'>{error?.optionLength}</p>}
    </div>
  )
}

export default Cloze;