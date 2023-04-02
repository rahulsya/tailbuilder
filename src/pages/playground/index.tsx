import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Navigations from '@/components/playground/navigations';
import Hero from '@/components/playground/hero';
import Hover from '@/components/Hover';

const listComponents = [
  {
    id: 1,
    name: 'navigation',
    component: <Navigations type="dark" />,
  },
  {
    id: 2,
    name: 'hero',
    component: <Hero />,
  },
  {
    id: 3,
    name: 'hero',
    component: <Hero type="hero-two" />,
  },
  {
    id: 4,
    name: 'hero',
    component: <Hero />,
  },
  {
    id: 5,
    name: 'hero',
    component: <Hero type="hero-two" />,
  },
];

function Playground() {
  const [components, setComponents] = useState(listComponents);
  const [showListComponent, isShowListComponent] = useState(false);

  const reorder = (list, startIndex: number, lastIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    console.log('removed item', removed);

    result.splice(lastIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: any) => {
    console.log(result);

    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sorting = reorder(components, source.index, destination.index);
    // console.log(sorting);
    setComponents(sorting);
  };

  const addNewComponent = (index: number) => {
    // const item = {
    //   id: 66,
    //   name: 'navigations-baru',
    //   component: <Navigations />,
    // };
    // const tempComponents = Array.from(components);
    // tempComponents.splice(index, 0, item);
    // setComponents(tempComponents);
    // setComponents((prevArray) => prevArray.splice(index, 0, item));
  };

  return (
    <>
      <div className="flex mt-5 ">
        {/* <div>component</div> */}
        <div className="container mx-auto py-5 px-12 h-[800px] overflow-auto bg-gray-100 rounded-lg">
          {/* <div className="w-1/4 bg-gray-500"></div> */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="my-droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {components.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={`item-${item.id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                          className={`py-5 `}
                        >
                          {snapshot.isDragging ? (
                            <>
                              <div className="w-full flex justify-center">
                                <button className="capitalize w-full px-3 py-4 rounded-lg border-dashed border-2 border-sky-500">
                                  Component-{item.name}
                                </button>
                              </div>
                            </>
                          ) : (
                            <Hover
                              onAddComponent={() => addNewComponent(index)}
                              isDragable={snapshot.isDragging}
                            >
                              {item.component}
                            </Hover>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {/* <div className="w-1/4 bg-gray-200 ">c</div> */}
        </div>
      </div>
    </>
  );
}

export default Playground;
