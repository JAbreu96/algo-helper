import React, { useCallback } from 'react';
import { Container } from '@mui/material';
import Cell from './Cell.js';

import '../css/ListColumn.css';

const ListColumn = ({ title, cards, status, onChange }) => {

  let sorted = cards.sort((a, b) => a.order - b.order);

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
            return <Cell key={`status-${card.id}`} info={card} status={status} />
          })
        }
        </div>
      </Container>
    </>
  )
}

export default ListColumn; 