import React, { useCallback } from 'react';
import { Container } from '@mui/material';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../utility/DragTypes.js';
import Cell from './Cell.js';
import '../css/ListColumn.css';

const ListColumn = ({ onDrop, status, cards, moveCard }) => {

  // const [{isOver}, drop] = useDrop({
  //   accept: ItemTypes,
  //   canDrop: (item, monitor) => {
  //     const itemIndex = statuses.findIndex((si) => si.satus === item.status);
  //     const statusIndex = statuses.findIndex((si) => si.index === status);
  //     return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
  //   },
  //   drop: (item, monitor) => {
  //     onDrop(item, monitor, status);
  //   },
  //   collect: (monitor) => ({
  //     isOver: monitor.isOver(),
  //   }),
  // });

  const renderCard = useCallback((card, index) => {
    return (
      <Cell key={card.text + index} id={card.id} text={card.text} index={index} moveCard={moveCard} />
    )
  }, [])

  return (
    <>
      {console.log(cards)}
      <Container className="listColumn-container">
        {cards.map((card, i) => renderCard(card, i))}
      </Container>
    </>
  )
}

export default ListColumn;