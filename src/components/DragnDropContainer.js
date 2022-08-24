import React, { useState, useCallback } from 'react';
import update from 'immutability-helper';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ListColumn from './ListColumn.js';
import { ItemTypes } from '../utility/DragTypes.js';
import { useDrop } from 'react-dnd';

import '../css/DragnDropContainer.css';
const DragnDropContainer = ({ x, y, children }) => {
  const [count, updateCount] = useState(0);
  // Cards State
  const [cards, createCards] = useState({
    todo: [],
    revisit: [],
    done: []
  })

  //ChangeCard Handler
  const cardChangeHandler = (cardInfo, newStatus, targetCardId) => {
    const { id, status: oldStatus } = cardInfo;

    //Finds element within the card collection of a list
    let dropCard = cards[oldStatus].find((el => el.id === id)); //Card we are dropping
    let targetCard = targetCardId !== ""
      ? cards[newStatus].find(el => el.id === targetCardId) : null; //Card we are targeting

    //finds the max order value INVESTIGATE
    let newListOrderValueMax = cards[newStatus]
      .map(item => item.order)
      .reduce((maxV, a) => Math.max(maxV, a), 0)

    //Case 1: If same list: work only this if block then return
    if (oldStatus === newStatus) {

      // reorders the list
      let temp = cards[oldStatus].map(item => {
        //Checks if item is the same as the card we are dropping
        if (item.id === dropCard.id) {
          return {
            ...dropCard,
            order: targetCard
              ? targetCard.order - 1 : newListOrderValueMax + 1
          };
        }
        return item;
      }).sort((a, b) => a.order - b.order)
        .map((item, i) => {
          return { ...item, order: i + 1 }
        });

      // Call State change
      createCards((item) => {
        return { ...item, [oldStatus]: temp };
      });
      return;
    }

    // Case 2: Drag across multiple lists
    let tempGaveList = cards[oldStatus]
      .filter((item) => item.id !== id)
      .sort((a, b) => a.order - b.order)
      .map((item, i) => {
        return { ...item, order: i + 1 };
      });
    let tempRecievedList = [
      ...cards[newStatus],
      {
        ...dropCard,
        order: targetCard
          ? targetCard.order - 1
          : newListOrderValueMax + 1,
      },
    ]
      .sort((a, b) => a.order - b.order)
      .map((item, i) => {
        return { ...item, order: i + 1 };
      })

    createCards((card) => {
      return { ...card, [oldStatus]: tempGaveList, [newStatus]: tempRecievedList };
    })
  }

  //ADD CARDS
  /*
  //SHOWN TO USER
  Expected Obj:
  Title: String
  Difficulty: 0 - 2
  Time: int
  Time & Space Complexity: String
  Link to Problem
  Comments

  //NOT SHOWN
  id: int
  status: string
  order: int
  */

  const addCard = (status) => {
    let card = {
      id: "qwe" + count,
      title: "New Card",
      status: status,
      order: cards[status].length + 1,
      difficulty: 0,
      time: 30,
      timeSpace: 'O(n)',
      link: '',
      questionType: 'Arrays',
      comments: ''
    }


    updateCount(count + 1);
    // const newList = [...cards[status], card];

    createCards((item) => {
      return { ...item, [status]: [...cards[status], card] }
    })

  }

  return (
    <section className="lists-container">
      {Object.keys(cards).map((key, i) => {
        return <ListColumn key={key} title={key} status={key} cards={cards[key]} onChange={cardChangeHandler} addCard={addCard} />
      })}
    </section>
  )
}

export default DragnDropContainer;