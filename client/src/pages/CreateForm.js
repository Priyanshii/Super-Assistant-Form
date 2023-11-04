import React, { useState } from 'react'

const CreateForm = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const [selectOption, setSelectOption] = useState("select");

  const handleSelectOption = (e) => {
    setSelectOption(e.target.value)
  }

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  }

  return (
    <div>
      <div className="">
        <section>
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
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
        <section>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
    </div>
  )
}

export default CreateForm;