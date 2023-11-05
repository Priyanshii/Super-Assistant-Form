import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';

const Categorize = ({ onUpdate, formSubmitted, handleError }) => {

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
        question['type'] = 'Categorize';
        question['description'] = description;
        question['categories'] = filteredCategoriesList;
        question['items'] = filteredItemsList;
        question['correctCategoryForItem'] = itemCategoryMapping;
        console.log(question);
        setError({});
        onUpdate(question);
        handleError({ Categorize: false });
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
    <div>
      <div>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <span>Catgories</span>
        <div>
          {
            categoriesList.map((category, index) => {
              return (
                <div key={index} className='category'>
                  <input
                    type="text"
                    placeholder={`Category ${index + 1}`}
                    value={category}
                    onChange={(e) => { handleCategoryNameChange(e, index) }}
                  />
                  {
                    categoriesList.length > 2
                    &&
                    <button onClick={() => { handleRemoveCategory(index) }}>
                      <AiOutlineClose />
                    </button>
                  }
                </div>
              )
            }
            )}
          <button onClick={handleAddCategory}>
            Add Catgory
          </button>
          {formSubmitted && error?.categories && <p>{error?.categories}</p>}
        </div>
      </div>
      <div>
        <span>Items</span>
        <div>
          {
            itemsList.map((itemDetail, index) => {
              const { item, category } = itemDetail;
              return (
                <div key={index}>
                  <input
                    placeholder={`Item ${index + 1}`}
                    type="text"
                    value={item}
                    onChange={(e) => { handleItemNameChange(e, index) }}
                  />
                  {
                    itemsList.length > 2
                    &&
                    <button onClick={(e) => { handleRemoveItem(index) }}>
                      <AiOutlineClose />
                    </button>
                  }
                  <section>
                    <select value={category} onChange={(e) => { handleSelectedCategoryForItem(e, index) }}>
                      <option value="" disabled>select...</option>
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
          <button onClick={handleAddItems}>
            Add Items
          </button>
          {formSubmitted && error?.items && <p>{error.items}</p>}
          {formSubmitted && error?.mapping && <p>{error.mapping}</p>}
        </div>
      </div>
    </div>
  )
}

export default Categorize;