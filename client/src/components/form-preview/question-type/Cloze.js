import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Cloze = ({ index, options, preview: initialPreview, handleFormResponse }) => {

  const [preview, setPreview] = useState(initialPreview);
  const [wordList, setWordList] = useState(options);

  useEffect(() => {
    handleFormResponse({
      index: index,
      type: 'cloze',
      preview: initialPreview,
      options: options,
      response: preview
    })

  }, [preview])

  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log(result);
    if (!destination) {
      return;
    }
    console.log(source.droppableId, destination.droppableId);

    const useIndex = destination.droppableId.split('_')[1];
    const updatedWords = [...wordList];
    updatedWords.splice(result.source.index, 1);

    console.log(useIndex);

    const updated = preview.split(/(______)/).map((part, index) => {
      console.log(index, useIndex, part);
      if(index == useIndex && part === '______'){
        console.log(wordList[result.source.index]);
        return wordList[result.source.index];
      } else {
        return part;
      }
    })
    console.log(updated.join(''));

    setWordList(updatedWords);
    setPreview(updated.join(''));
  };


  return (
    <div className='w-full h-auto p-6 shadow border-[1px] border-solid border-[#b6b5b5] flex flex-col items-center gap-8'>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col items-center justify-normal gap-4">
          <Droppable droppableId="wordList" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-row items-center justify-normal gap-4"
              >
                {wordList.map((word, index) => (
                  <Draggable key={word} draggableId={word} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="px-5 py-2 rounded bg-[#b3eeeb]"
                      >
                        {word}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className='flex flex-row items-center justify-normal gap-4 flex-wrap'>
            {preview.split(/(______)/).map((part, index) => {
              if (part === '______') {
                return (
                  <Droppable key={index} droppableId={`drop_${index}`}>
                    {(provided) => (
                      <span
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="w-[30px]"
                      >
                        ______
                      </span>
                    )}
                  </Droppable>
                );
              } else {
                return <span key={index} className="static">{part}</span>;
              }
            })}
          </div>
        </div>
      </DragDropContext>
    </div>
  )
}

export default Cloze