import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';

const Categorize = () => {
  const [categoriesList, setCategoriesList] = useState(['', '']);
  const [itemsList, setItemsList] = useState([
    { 'item': '', 'category': '' },
    { 'item': '', 'category': '' }
  ]);
  const [description, setDescription] = useState();

  const handleAddCategory = () => {
    setCategoriesList((categoriesList) => (
      [...categoriesList, '']
    ));
    // const categoriesListLength = Object.keys(categoriesList).length;
    // const newCategoriesList = { ...categoriesList, [categoriesListLength]: '' };
    // setCategoriesList(newCategoriesList);
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
    // setCategoriesList((categoriesList) => ({
    //   ...categoriesList,
    //   [index]: e.target.value
    // }));
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
    // const updatedCategoriesList = Object.fromEntries(
    //   Object.entries(categoriesList).filter(([key, value]) => key !== index)
    // );

    // setCategoriesList(updatedCategoriesList);
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
                    value={category}
                    onChange={(e) => { handleCategoryNameChange(e, index) }}
                  />
                  <button onClick={(e) => { handleRemoveCategory(index) }}>
                    <AiOutlineClose />
                  </button>
                </div>
              )
            }
            )}
          <button onClick={handleAddCategory}>
            Add Catgory
          </button>
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
                    type="text"
                    value={item}
                    onChange={(e) => { handleItemNameChange(e, index) }}
                  />
                  <button onClick={(e) => { handleRemoveItem(index) }}>
                    <AiOutlineClose />
                  </button>
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
        </div>
      </div>
    </div>
  )
}

export default Categorize