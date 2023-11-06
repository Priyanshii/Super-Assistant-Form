import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';

const Categorize = ({ index, onUpdate, formSubmitted, handleError }) => {

  const [description, setDescription] = useState();
  const [categoriesList, setCategoriesList] = useState(['', '']);
  const [itemCategoryMapping, setItemCategoryMapping] = useState({});
  const [error, setError] = useState({});

  const [itemsList, setItemsList] = useState([
    { 'item': '', 'category': '' },
    { 'item': '', 'category': '' }
  ]);

  useEffect(() => {
    if (formSubmitted.value) {
      setError({});
      const question = {};
      const filteredCategoriesList = categoriesList.filter((category) => category.trim() !== '');
      const filteredItemsList = itemsList.map((itemObject) => itemObject.item).filter((item) => item.trim() !== '');

      const itemCategoryMapping = {};
      itemsList.map((element, index) => {
        itemCategoryMapping[element.item] = element.category;
      });
      console.log(itemCategoryMapping);

      if (filteredCategoriesList.length < 2) {
        setError((prevError) => ({
          ...prevError,
          categories: 'Please add atleast two categories'
        }))
      } else if (filteredItemsList.length < 2) {
        setError((prevError) => ({
          ...prevError,
          items: 'Please add atleast two items'
        }))
      } else if (itemsList.some((element) => element.item === '' || element.category === '')) {
        setError((prevError) => ({
          ...prevError,
          mapping: 'Please select category for all items'
        }))
      } else {
        question['id'] = index;
        question['type'] = 'categorize'
        question['description'] = description;
        question['categories'] = filteredCategoriesList;
        question['items'] = filteredItemsList;
        question['correctCategoryForItem'] = itemCategoryMapping;
        console.log(question);
        setError({});
        onUpdate(question);
        handleError({ [index]: false });
      }
    }
  }, [formSubmitted])

  const handleAddCategory = () => {
    setCategoriesList((categoriesList) => (
      [...categoriesList, '']
    ));
  }

  const handleCategoryNameChange = (e, index) => {
    setCategoriesList((categoriesList) => {
      const updatedCategoriesList = categoriesList.map((category, i) => {
        if (i === index) {
          return e.target.value;
        }
        return category;
      });
      return updatedCategoriesList;
    });
  }

  const handleItemNameChange = (e, index) => {
    setItemsList((prevItemsList) => {
      const updatedItemsList = prevItemsList.map((itemDetail, i) => {
        if (i === index) {
          return { ...itemDetail, item: e.target.value };
        }
        return itemDetail;
      });
      return updatedItemsList;
    });
  }

  const handleSelectedCategoryForItem = (e, index) => {
    setItemsList((prevItemsList) => {
      const updatedItemsList = prevItemsList.map((itemDetail, i) => {
        if (i === index) {
          return { ...itemDetail, category: e.target.value };
        }
        return itemDetail;
      });
      return updatedItemsList;
    });
  }

  const handleRemoveCategory = (index) => {
    if (categoriesList.length > 2) {
      setCategoriesList((categoriesList) => {
        return categoriesList.filter((category, i) => i !== index);
      });
    }
  }

  const handleRemoveItem = (index) => {
    if (itemsList.length > 2) {
      setItemsList((prevItemsList) => {
        return prevItemsList.filter((item, i) => i !== index);
      });
    }
  }

  const handleAddItems = () => {
    setItemsList((itemsList) => (
      [...itemsList, { item: '', category: '' }]
    ));
  }

  return (
    <div className='w-full h-auto p-6 shadow border-[1px] border-solid border-[#b6b5b5] flex flex-col items-start gap-8'>
      <div className='w-full'>
        <input placeholder='Add Description (optional)' name='description' type='text' value={description} onChange={(e) => setDescription(e.target.value)} className='text-base p-3 pl-1 w-full border-b-[1px] border-solid border-[#b6b5b5] outline-none focus:border-[#1ac914]' />
      </div>
      <div className='flex flex-col items-start justify-normal gap-4'>
        <span className='text-lg font-medium text-[#414141]'>Catgories</span>
        <div className='flex flex-col items-start justify-normal gap-5 ml-4'>
          {
            categoriesList.map((category, index) => {
              return (
                <div key={index} className='flex flex-row items-center gap-2'>
                  <input
                    type="text"
                    placeholder={`Category ${index + 1}`}
                    value={category}
                    onChange={(e) => { handleCategoryNameChange(e, index) }}
                    className='border-[1px] border-solid border-[#b6b5b5] rounded p-2 outline-none'
                  />
                  {
                    categoriesList.length > 2
                    &&
                    <button className='p-1' onClick={() => { handleRemoveCategory(index) }}>
                      <AiOutlineClose />
                    </button>
                  }
                </div>
              )
            }
            )}
          <button className='text-white bg-[#2d8394] mt-2 border-[1px] border-solid border-[#b6b5b5] px-2 py-1' onClick={handleAddCategory}>
            Add Catgory
          </button>
          {formSubmitted && error?.categories && <p className=' text-sm text-red-500'>{error?.categories}</p>}
        </div>
      </div>
      <div className='flex flex-col items-start justify-normal gap-4'>
        <div className='w-full flex flex-row items-center justify-between'>
        <span className='text-lg font-medium text-[#414141]'>Items</span>
        <span className='text-lg font-medium text-[#414141]'>Belongs to</span>
        </div>
        <div className='flex flex-col items-start justify-normal gap-5 ml-4'>
          {
            itemsList.map((itemDetail, index) => {
              const { item, category } = itemDetail;
              return (
                <div key={index} className='flex flex-row items-center gap-20'>
                  <input
                    placeholder={`Item ${index + 1}`}
                    type="text"
                    value={item}
                    onChange={(e) => { handleItemNameChange(e, index) }}
                    className='border-[1px] border-solid border-[#b6b5b5] rounded p-2 outline-none'
                  />
                  {
                    itemsList.length > 2
                    &&
                    <button className='p-1'  onClick={(e) => { handleRemoveItem(index) }}>
                      <AiOutlineClose />
                    </button>
                  }
                  <section>
                    <select className='px-4 py-3 bg-white border-[1px] border-solid border-[#b6b5b5] rounded outline-none' value={category} onChange={(e) => { handleSelectedCategoryForItem(e, index) }}>
                      <option className='text-[#b6b5b5]' value="" disabled>Select Category</option>
                      {
                        Object.values(categoriesList).map((category, index) => {
                          if (category !== '') {
                            return (
                              <option key={index} value={category}>{category}</option>
                            )
                          }
                        })
                      }
                    </select>
                  </section>
                </div>
              )
            }
            )}
          <button className='text-white bg-[#2d8394] mt-2 border-[1px] border-solid border-[#b6b5b5] px-2 py-1' onClick={handleAddItems}>
            Add Items
          </button>
          {formSubmitted && error?.items && <p className=' text-sm text-red-500'>{error.items}</p>}
          {formSubmitted && error?.mapping && <p className=' text-sm text-red-500'>{error.mapping}</p>}
        </div>
      </div>
    </div>
  )
}

export default Categorize;