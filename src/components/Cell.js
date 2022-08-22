import React, { useState } from 'react';
import { Card } from '@mui/material';
const Cell = ({ info, handlers, status }) => {
  const {id} = info;
  console.log(info);
  const [onHold, setOnHold] = useState(false);

  const dragStartHandler = (e) => {
    e.dataTransfer.setData("cardInfo", JSON.stringify({id, status}));
    e.target.className += " onhold";
    setTimeout(() => {
      setOnHold(true);
    }, 0);
  };

  const dragEndHandler = (e) => {
    setOnHold(false);
  }

  const onDragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className === "card") {
      setTimeout(() => {
        e.target.className = "card anotherCardOnTop";
      }, 0);
    }
  };

  const onDragLeaveHandler = (e) => {
    resetClassName(e);
  }

  const onDropHandler = (e) => {
    resetClassName(e);
  }

  const resetClassName = (e) => {
    e.preventDefault();
    let isCard =
      e.target.className === "card" || e.target.className === "card anotherCardOnTop";
    
    if (isCard) {
      setTimeout(() => {
        e.target.className = "card";
      }, 0);
    }
  };

  return (
    <div
      id={id}
      className={`card ${onHold ? "hidden" : ""}`}
      draggable="true"
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDragOver={onDragOverHandler}
      onDragLeave={onDragLeaveHandler}
      onDrop={onDropHandler}
    >
      <Card variant="outlined">{info.title}</Card>
    </div>
  )
}

export default Cell;