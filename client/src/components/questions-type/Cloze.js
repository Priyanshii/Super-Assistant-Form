import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';

const modules = {
  toolbar: [
    ['underline'],
  ]
}
const Cloze = ({ onUpdate, formSubmitted, handleError }) => {

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
      if (underlinedWords.length < 2) {
        setError((prevError) => ({
          ...prevError,
          optionLength: 'Please add atleast two options'
        }))
      } else {

        question['type'] = 'Cloze';
        question['preview'] = preview.replace(/<[^>]*>/g, '');
        question['options'] = [...underlinedWords, ...clozeOptions];
        question['correctSequenceOptions'] = underlinedWords;
        console.log(question);
        setError({});
        onUpdate(question);
        handleError({ Cloze: false });
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
      preview = preview.replace(`<u>${text}</u>`, `<u>${text.replace(/./g, '_')}</u>`);
    });
    return preview;
  }
  return (
    <div>
      <section>
        <label>Preview</label>
        <span dangerouslySetInnerHTML={{ __html: preview }} ></span>
      </section>
      <section>
        <label>Sentence</label>
        <ReactQuill style={{ width: '100%' }} placeholder='Underline the words here to convert them into blanks' modules={modules} theme="snow" value={sentence} onChange={setSentence} />
      </section>
      {formSubmitted && error?.noSentence && <p>{error?.noSentence}</p>}
      {formSubmitted && error?.noUnderline && <p>{error?.noUnderline}</p>}
      <section>
        {
          underlinedWords.length > 0
          &&
          underlinedWords.map((word, index) => {
            return (
              <div key={index}>
                <input type="checkbox" checked={true} />
                <input type="text" value={word} disabled />
              </div>
            )
          })
        }
        {
          clozeOptions.map((option, index) => {
            return (
              <div key={index}>
                <input type="checkbox" checked={false} />
                <input type="text" value={option} onChange={(e) => handleClozeOptionUpdate(e, index)} />
              </div>
            )
          })
        }
      </section>
      <button onClick={handleAddClozeOption}>
        Add Option
      </button>
      {formSubmitted && error?.optionLength && <p>{error?.optionLength}</p>}
    </div>
  )
}

export default Cloze