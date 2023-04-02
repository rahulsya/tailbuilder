import React, { useState } from 'react';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import { Items } from './data-items';

function Ex() {
  const [items, setItems] = useState([Items(10), Items(5, 10), Items(5, 16)]);
  console.log(items);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const getItemStyle = (isDragging: boolean, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 8 * 2,
    margin: `0 0 ${8}px 0`,

    // change background colour if dragging
    background: isDragging ? 'red' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: 8,
    width: 250,
  });

  const onDragend = (result: any) => {
    console.log(result);

    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const resultOrder = reorder(items[sInd], source.index, destination.index);
      const newState = [...items];
      newState[sInd] = resultOrder;

      setItems(newState);
    } else {
      const result = move(items[sInd], items[dInd], source, destination);
      const newState = [...items];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setItems(newState.filter((group) => group.length));
    }
  };

  return (
    <div className="px-4 mt-5 flex">
      <DragDropContext onDragEnd={onDragend}>
        {/* <Droppable droppableId="parent">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              parent area
              <Draggable index={99} draggableId="parent">
                {(provided, snapshot) => <div>aaa</div>}
              </Draggable>
            </div>
          )}
        </Droppable> */}

        {items.map((el, ind) => (
          <Droppable key={ind} droppableId={`${ind}`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                <>
                  <div>drop area</div>
                  {el.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <>
                          {snapshot?.isDragging && <div>dragging</div>}
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                              }}
                            >
                              {item.content}
                              <button
                                type="button"
                                onClick={() => {
                                  const newState = [...items];
                                  newState[ind].splice(index, 1);
                                  console.log(
                                    'delete',
                                    newState.filter((group) => group.length)
                                  );

                                  setItems(
                                    newState.filter((group) => group.length)
                                  );
                                }}
                              >
                                delete
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </Draggable>
                  ))}
                </>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}

export default Ex;
