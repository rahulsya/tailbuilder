import React from 'react';
import { Droppable as Drop } from 'react-beautiful-dnd';

type IProps = {
  id?: any;
  children(provided: any, snapshot: any): React.ReactElement<HTMLElement>;
};

function Droppable({ id, children }: IProps) {
  return <Drop droppableId={id}>{children}</Drop>;
}

export default Droppable;
