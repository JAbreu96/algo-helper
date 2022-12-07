import React, { useState } from 'react';
import { Card } from '@mui/material';

import '../css/Cell.css';

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
      <Card variant="outlined" className='card_container'>
        {
          (function() {
            if (info.difficulty === 'easy') {
              return <div className={'card_container_difficulty'} style={{'backgroundColor': 'green'}}></div>
            }
            if (info.difficulty === 'medium') {
              return <div className={'card_container_difficulty'} style={{'backgroundColor': 'yellow'}}></div>
            }
            if (info.difficulty === 'hard') {
              return <div className={'card_container_difficulty'} style={{'backgroundColor': 'red'}}></div>
            }
          })()
        }
        <div className='card_container_info'>
          <div className='card_container_info_text'>
            <p className={'card_container_info_text_platform'}>{info.platform}</p>
            <p className={'card_container_info_text_problem'}>{info.problemName}</p>
          </div>
          <div className='card_container_info_action'>
            <input className={'card_container_info_action_btn'} type="button" value="Edit" onClick={(e) => {
              toggleModal(index, status);
              e.preventDefault();
            }}/>
            {
              (function() {
                if (info.completed) {
                  return <p className={'card_container_info_action_complete'} style={{'color': 'green'}}>Complete</p>
                }
                return <p className={'card_container_info_action_complete'} style={{'color': 'grey'}}>Incomplete</p>
              })()
            }
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Cell;