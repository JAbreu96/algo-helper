import React, { useState } from 'react';
import { Card } from '@mui/material';
const Cell = ({ info, handlers, status, toggleModal, index }) => {
  const {id} = info;
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
      <Card variant="outlined">
        <div className='card_status'>
          {
            (function() {
              if (info.difficulty === 'easy') {
                return <p className={'card_status_difficulty'} style={{'backgroundColor': 'green'}}>0</p>
              }
              if (info.difficulty === 'medium') {
                return <p className={'card_status_difficulty'} style={{'backgroundColor': 'yellow'}}>0</p>
              }
              if (info.difficulty === 'hard') {
                return <p className={'card_status_difficulty'} style={{'backgroundColor': 'red'}}>0</p>
              }
            })()
          }
          {
            (function() {
              if (info.completed) {
                return <p className={'card_status_complete'} style={{'color': 'green'}}>Complete</p>
              }
              return <p className={'card_status_complete'} style={{'color': 'grey'}}>Incomplete</p>
            })()
          }
        </div>
        <p className={'card_platform'}>{info.platform}</p>
        <p className={'card_problem'}>{info.problemName}</p>
        <input className={'card_btn'} type="button" value="Edit" onClick={(e) => {
          toggleModal(index, status);
          e.preventDefault();
        }}/>
      </Card>
    </div>
  )
}

export default Cell;