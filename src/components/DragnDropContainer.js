import React from 'react';

import ListColumn from './ListColumn.js';


import '../css/DragnDropContainer.css';
const DragnDropContainer = ({ x, y, children, count, updateCount, cards, createCards, cardChangeHandler, addCard, toggleModal }) => {
  

  return (
    <section className="lists-container">
      {Object.keys(cards).map((key, i) => {
        return <ListColumn key={key} title={key} status={key} cards={cards[key]} onChange={cardChangeHandler} addCard={addCard} toggleModal={toggleModal}/>
      })}
    </section>
  )
}

export default DragnDropContainer;