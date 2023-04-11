import React, { useState } from 'react';
type IProps = {
  children: React.ReactNode;
  isDragable?: boolean;
  onAddComponent?: () => void;
};
function Hover({ children, isDragable, onAddComponent }: IProps) {
  const [isHover, setIsHover] = useState(false);
  const [active, setActive] = useState(false);
  return (
    <div
      onClick={() => setActive(!active)}
      // onMouseEnter={() => !isDragable && setIsHover(true)}
      // onMouseLeave={() => setIsHover(false)}
      className={`w-full cursor-pointer ${
        isDragable && 'border-2 rounded-lg border-blue-400'
      } ${active && 'border-2 rounded-lg border-blue-400'} `}
    >
      {/* {isHover && (
        <div className="w-full flex justify-center">
          <button
            onClick={onAddComponent}
            className="capitalize w-full px-3 py-2 rounded-lg border-dashed border-2 border-yellow-500"
          >
            Add Components
          </button>
        </div>
      )} */}
      {active && (
        <div className="flex flex-end justify-end">
          <p>delete</p>
          <p>move up</p>
        </div>
      )}
      {children}
      {/* {isHover && <div>button</div>} */}
    </div>
  );
}

export default Hover;
