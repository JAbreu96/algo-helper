import React, { useState } from 'react';
import DragnDropContainer from '../components/DragnDropContainer.js'
import CellModal from '../components/CellModal.js';
import CARD_INFO from '../constants/CardInfo.js';

const MainPage = () => {
  const [cardEdit, toggleCardEdit] = useState(false);
  const [count, updateCount] = useState(0);
  const [modalInputs, updateInputs] = useState({index: -1, status: 'todo'});
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

  const addCard = (status) => {

    CARD_INFO.status = status;
    CARD_INFO.order = cards[status].length + 1;
    console.log(CARD_INFO);

    updateCount(count + 1);

    createCards((item) => {
      return { ...item, [status]: [...cards[status], CARD_INFO] }
    })

  }
  const toggleModal = (index, status) => {
    if (cardEdit) {
      toggleCardEdit(false)
    } else {
      toggleCardEdit(true);
    }

    populateModal(index, status);
  }

  const populateModal = (index, status) => {
    updateInputs({index: index, status: status})
  }

  return (
    <>
      <DragnDropContainer cardToggled={false} toggleModal={toggleModal} count={count} updateCount={updateCount} cardChangeHandler={cardChangeHandler} addCard={addCard} cards={cards} />
      <CellModal open={cardEdit} toggleModal={toggleModal} cardInfo={modalInputs} cards={cards}/>
    </>
  )
}

export default MainPage;