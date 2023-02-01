import React from 'react';

import ListColumn from './ListColumn.js';


import '../css/DragnDropContainer.css';
const DragnDropContainer = ({ x, y, children, count, updateCount, cards, createCards, cardChangeHandler, addCard, toggleModal }) => {


  return (
    <section className="lists_container">
      {cards.map((category, i) => {

        return <ListColumn key={category.status} title={category.status} status={category.status} cards={category.RESULT} onChange={cardChangeHandler} addCard={addCard} toggleModal={toggleModal} />
      })}
    </section>
  )
}

export default DragnDropContainer;