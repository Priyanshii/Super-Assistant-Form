import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Categorize = ({ index, items, categories, handleFormResponse }) => {

  const [itemsState, setItemsState] = useState(items);
  const [categoryStates, setCategoryStates] = useState(
    categories.reduce((acc, category) => {
      acc[category] = [];
      return acc;
    }, {})
  );

  useEffect(() => {
    console.log(categoryStates);
    const outputResponse = {};

    for (const key in categoryStates) {
      const values = categoryStates[key];
      values.forEach(value => {
        outputResponse[value] = key;
      });
    }
    console.log(outputResponse);

    handleFormResponse({
      index: index,
      type: 'categorize',
      response: outputResponse
    })

  }, [categoryStates])

  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log(result);
    if (!destination) {
      return;
    }
    console.log(source.droppableId, destination.droppableId);

    if (source.droppableId !== destination.droppableId) {
      const item = itemsState[source.index];
      const category = destination.droppableId;
      setCategoryStates((prevState) => ({
        ...prevState,
        [category]: [...prevState[category], item],
      }));
      setItemsState((prevState) => prevState.filter((_, index) => index !== source.index));
    }

    if (source.droppableId === 'items' && destination.droppableId === 'items') {
      const reorderedItems = [...itemsState];
      const [movedItem] = reorderedItems.splice(source.index, 1);
      reorderedItems.splice(destination.index, 0, movedItem);
      setItemsState(reorderedItems);
    }
  };

  return (
    <div className='w-full h-auto p-6 shadow border-[1px] border-solid border-[#b6b5b5] flex flex-col items-center gap-8'>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='flex flex-col items-center justify-normal gap-4'>
          <Droppable droppableId="items" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-row items-center justify-normal gap-4"
              >
                {itemsState.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <div
                        className='px-5 py-2 rounded bg-[#b3eeeb]'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className='flex flex-row items-center justify-normal gap-4 flex-wrap'>
            {categories.map((category) => (
              <Droppable key={category} droppableId={category} direction="vertical">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="h-auto min-h-[220px] w-[200px] flex flex-col items-center justify-start border-[1px] border-solid border-[#9b9797] rounded-md"
                  >
                    <h2>{category}</h2>
                    {categoryStates[category].map((item, index) => (
                      <div className='m-2 border-[1px] border-solid border-[#9b9797] w-[80%] text-center rounded-md' key={item}>
                        {item}
                      </div>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </DragDropContext>
    </div>
  )
}

export default Categorize