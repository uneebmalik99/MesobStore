import React, { useRef } from 'react';
import ChildComponent from './C_test';

function ParentComponent() {
  const childRef = useRef();

  const parentFunction = () => {
    console.log('Parent function called from child');
    childRef.current.childFunctionFromParent();
  };

  return (
    <div>
      <ChildComponent parentFunction={parentFunction} ref={childRef} />
    </div>
  );
}

export default ParentComponent;
