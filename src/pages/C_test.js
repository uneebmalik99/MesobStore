import React, { forwardRef, useImperativeHandle } from 'react';

const ChildComponent = forwardRef((props, ref) => {
  const childFunctionFromParent = () => {
    console.log('Child function called from parent');
    // Continue with child-specific logic here
  };

  // Expose the child function through the ref
  useImperativeHandle(ref, () => ({
    childFunctionFromParent,
  }));

  return (
    <div>
      <button onClick={props.parentFunction}>Call Parent Function</button>
    </div>
  );
});

export default ChildComponent;
