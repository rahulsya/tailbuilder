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

const availComponents = [
  {
    id: 1,
    name: 'dark-navigation',
    component: <Navigations type="dark" />,
  },
  {
    id: 2,
    name: 'light-navigation',
    component: <Navigations />,
  },
  {
    id: 3,
    name: 'sample-hero',
    component: <Hero />,
  },
  {
    id: 4,
    name: 'sample-hero-2',
    component: <Hero type="hero-two" />,
  },
];

function Playground() {
  const [components, setComponents] = useState([]);

  const [showListComponent, isShowListComponent] = useState(false);

  const reorder = (list, startIndex: number, lastIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(lastIndex, 0, removed);
    return result;
  };

  const addComponents = (list, source: number, destination: number) => {
    const currComponents = Array.from(list);
    const dummyCom = availComponents[source];
    currComponents.splice(destination, 0, {
      ...dummyCom,
      id: components.length + 1,
    });
    return currComponents;
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === 'components-avail' &&
      destination.droppableId === 'my-droppable'
    ) {
      console.log('added new comp');

      const newComponents = addComponents(
        components,
        source.index,
        destination.index
      );
      setComponents(newComponents);
    }

    if (
      source.droppableId === 'my-droppable' &&
      destination.droppableId === 'my-droppable'
    ) {
      const sorting = reorder(components, source.index, destination.index);
      setComponents(sorting);
    }
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
      <div className="flex min-h-screen">
        {/* <div>component</div> */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="w-1/4 bg-white py-5 px-5">
            <Droppable droppableId="components-avail">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {availComponents.map((item, index) => (
                    <Draggable
                      key={item.id}
                      index={index}
                      draggableId={`comps-${item.id}`}
                    >
                      {(provided, snapshot) => (
                        <>
                          {snapshot?.isDragging && (
                            <div className={`pt-5`}>
                              <div className="w-full bg-gray-200 rounded-md px-4 py-3">
                                {item.name}
                              </div>
                            </div>
                          )}
                          <div
                            key={index}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            // style={provided.draggableProps.style}
                            className={`py-2`}
                          >
                            <div className="w-full bg-gray-400 rounded-md px-4 py-3">
                              {item.name}
                            </div>
                          </div>
                        </>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </div>
          <div className="container mx-auto px-12 py-5 h-screen overflow-auto bg-gray-100 rounded-lg">
            <Droppable droppableId="my-droppable">
              {(provided, snapshot) => (
                <div
                  className={`min-h-full`}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {components.length == 0 && (
                    <div className="capitalize w-full px-3 py-8 rounded-lg border-dashed border-2 border-yellow-500 text-center">
                      Drag Components Here
                    </div>
                  )}
                  {components.map((item, index) => (
                    <React.Fragment key={item.id}>
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
                    </React.Fragment>
                  ))}
                  {provided.placeholder}
                  {/* {snapshot.draggingOverWith && (
                    <div className="capitalize w-full px-3 py-2 rounded-lg border-dashed border-2 border-yellow-500 text-center">
                      drop here
                    </div>
                  )} */}
                </div>
              )}
            </Droppable>
            {/* <div className="w-1/4 bg-gray-200 ">c</div> */}
          </div>
        </DragDropContext>
      </div>
    </>
  );
}

export default Playground;
