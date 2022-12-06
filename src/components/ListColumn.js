import React from 'react';
import { Container } from '@mui/material';
import Cell from './Cell.js';

import '../css/ListColumn.css';

const ListColumn = ({ title, cards, status, onChange, addCard, toggleModal }) => {

  const onDragEnterHandler = e => {
    e.preventDefault();
  }

  const onDragOverHandler = e => {
    e.preventDefault();
    if (e.target.className === "boardContentArea") {
      setTimeout(() => {
        e.target.className = "boardContentArea hovered";
      }, 0);
    }
  };

  const onDragLeaveHandler = e => {
    e.preventDefault();
    if (e.target.className === "boardContentArea hovered") {
      setTimeout(() => {
        e.target.className = "boardContentArea";
      }, 0);
    }
  }

  const onDropHandler = (e) => {

    let cardInfo = JSON.parse(e.dataTransfer.getData("cardInfo"));
    let targetCardId = e.target.id;

    onChange(cardInfo, status, targetCardId);
    onDragLeaveHandler(e);
  }

  return (
    <>
      <Container className="listColumn-container">
        <h3>{title}</h3>
        <div
          className="boardContentArea"
          onDragEnter={onDragEnterHandler}
          onDragOver={onDragOverHandler}
          onDragLeave={onDragLeaveHandler}
          onDrop={onDropHandler}
        >
          {
            cards.map((card, i) => {
              return <Cell index={i} key={`status-${card.id}`} info={card} status={status} questionType={card.questionType} toggleModal={toggleModal}/>
            })
          }
        </div>
        <input type='button' value="add card" onClick={() => {
          addCard(status);
        }} />
      </Container>
    </>
  )
}

export default ListColumn; 