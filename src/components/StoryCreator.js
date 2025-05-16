import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function StoryCreator({ setStory }) {
  const [elements, setElements] = useState([
    { id: "1", content: "Hero appears!" },
    { id: "2", content: "Dragon attacks!" },
  ]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setStory(elements.map((item) => item.content));
  }, [elements, setStory]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = [...elements];
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setElements(items);
  };

  const addElement = () => {
    const newElement = { id: `${elements.length + 1}`, content: `New part ${elements.length + 1}` };
    setElements([...elements, newElement]);
  };

  if (!isMounted) return null;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white">Create Your Story!</h2>
      <button
        onClick={addElement}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Add Story Part
      </button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="story">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="mt-4 p-4 bg-white rounded-lg"
            >
              {elements.map((element, index) => (
                <Draggable key={element.id} draggableId={element.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-2 mb-2 bg-yellow-200 rounded-lg"
                    >
                      {element.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="mt-4">
        <h3 className="text-lg font-bold text-white">Your Story:</h3>
        <p className="text-white">{elements.map((item) => item.content).join(" -> ")}</p>
      </div>
    </div>
  );
}