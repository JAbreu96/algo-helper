import React, { useState } from 'react';
import DragnDropContainer from '../components/DragnDropContainer.js'
import CellModal from '../components/CellModal.js';
import NavBar from '../components/NavBar.js';

const MainPage = (props) => {
  const [cardEdit, toggleCardEdit] = useState(false);

  const { cards, modalInputs, cardChangeHandler, addCard, changeCardInfo, updateCount, count, populateModal, userInfo } = props;
  //Modal On/Off State

  //Handler to toggleModal on/off
  const toggleModal = (index, status) => {
    if (cardEdit) {
      toggleCardEdit(false)
    } else {
      toggleCardEdit(true);
    }
    populateModal(index, status);
  }

  return (
    <>
      <NavBar />
      <DragnDropContainer cardToggled={false} toggleModal={toggleModal} count={count} updateCount={updateCount} cardChangeHandler={cardChangeHandler} addCard={addCard} cards={cards} />
      <CellModal open={cardEdit} toggleModal={toggleModal} changeCardInfo={changeCardInfo} cardInfo={modalInputs} cards={cards} userId={userInfo.id} />
    </>
  )
}

export default MainPage;