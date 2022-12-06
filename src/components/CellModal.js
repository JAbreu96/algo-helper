import React from 'react';
import '../css/CellModal.css';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const CellModal = ({ open, toggleModal, cardInfo, cards, changeCardInfo }) => {
  //NO CARD CHOSEN EDGECASE
  if (cardInfo.index === -1) {
    return <></>
  }

  const card = cards[cardInfo.status][cardInfo.index];
  const handleClose = () => {
    toggleModal(-1, '');
  }

  return (
    <div>
      <Modal className="modal" open={open} onClose={handleClose}>
        <Box className="modal_card">
          <form>
            <p>Date Created</p>
            <p>{card.dateCreated.toString()}</p>
            <label>Problem Name</label>
            <input type="text" defaultValue={card.problemName} onChange={(e) => {
              changeCardInfo(cardInfo, 'problemName', e.target.value);
            }}/>
            <label>Platform</label>
            <input type="text" defaultValue={card.platform} onChange={(e) => {
              changeCardInfo(cardInfo, 'platform', e.target.value);
            }}/>
            <label>Completed?</label>
            <input type="radio" defaultValue={'Completed'} defaultChecked={card.completed} onChange={(e) => {
              changeCardInfo(cardInfo, 'completed', e.target.checked);
            }}/>
            <fieldset id='difficulty' >
              <p>Difficulty</p>
              <label>Easy</label>
              <input type="radio" defaultValue={'easy'} name={'difficulty'} defaultChecked={card.difficulty==='easy'}
                onChange={(e) => {
                  if (e.target.checked) {
                    changeCardInfo(cardInfo, 'difficulty', 'easy');
                  }
                }}/>
              <label>Medium</label>
              <input type="radio" defaultValue={'medium'} name={'difficulty'} defaultChecked={card.difficulty === 'medium'}
                onChange={(e) => {
                  if (e.target.checked) {
                    changeCardInfo(cardInfo, 'difficulty', 'medium');
                  }
              }}/>
              <label>Hard</label>
              <input type="radio" defaultValue={'hard'} name={'difficulty'} defaultChecked={card.difficulty === 'hard'}
                onChange={(e) => {
                  if (e.target.checked) {
                    changeCardInfo(cardInfo, 'difficulty', 'hard');
                  }
                }}
              />
            </fieldset>
            <label>Looked at Solution?</label>
            <input type="radio" defaultValue={'Looked Up Solution'} defaultChecked={card.solutionLookup} 
            onChange={(e) => {
              changeCardInfo(cardInfo, 'solutionLookup', e.target.checked);
            }}/>
            <label>Description</label>
            <input type="text" defaultValue={card.description} onChange={(e) => {
              changeCardInfo(cardInfo, 'description', e.target.value);
            }}/>
            <label>Problem Number</label>
            <input type="text" defaultValue={card.problemNumber} onChange={(e) => {
              changeCardInfo(cardInfo, 'problemNumber', e.target.value);
            }}/>
            {/* THIS IS GOING TO BE A DROPDOWN */}
            <label>Data Structure Type</label>
            <input type="text" defaultValue={card.dataStructure}
              onChange={(e) => {
                
                changeCardInfo(cardInfo, 'dataStructure', e.target.value);
                
              }}
            />
            {/* ----------------------------- */}
            <label>Inputs</label>
            <input type="text" defaultValue={card.inputs} 
            onChange={(e) => {
              changeCardInfo(cardInfo, 'inputs', e.target.value);
            }}/>
            <label>Expected Output</label>
            <input type="text" defaultValue={card.expectedOutput}
            onChange={(e) => {
              changeCardInfo(cardInfo, 'expectedOutput', e.target.value);
            }}/>
            <label>Constraints</label>
            <input type="text" defaultValue={card.constraints}
            onChange={(e) => {
              changeCardInfo(cardInfo, 'constraints', e.target.value);
            }}/>
            <label>Comments</label>
            <input type="text" defaultValue={card.comments} 
            onChange={(e) => {
              changeCardInfo(cardInfo, 'comments', e.target.value);
            }}/>
            <Button className="modal_card_btn" size={'large'} color={"secondary"} onClick={() => {
              toggleModal(-1, '');
            }}>Save Card</Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}


export default CellModal;