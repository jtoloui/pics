import React from "react";

const LineBreak = (props) => {
  return (
    <div className='bx--grid'>
      <div className='bx--row'>
        <hr className={props.class}/>
      </div>
    </div>
  )
};

export default LineBreak;
