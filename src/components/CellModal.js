import React from 'react';
import '../css/CellModal.css';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

/*

comments
''

completed 
false

constraints 
""

dataStructure 
"string"

dateCreated
Mon Nov 28 2022 14:53:25 GMT-0500 (Eastern Standard Time) {}

description
"The string \"PAYPALISHIRING\" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility). And then read line by line: \"PAHNAPLSIIGYIR\"\n  Write the code that will take a string and make this conversion given a number of rows:"

difficulty 
"medium"

expectedOutput 
"PAHNAPLSIIGYIR"

inputs
"s = \"PAYPALISHIRING\", numRows = 3"

order
1

platform
"Leetcode"

problemName
"Zigzag Conversion"

problemNumber
6

solutionLookup
true

spaceComplexity
"Linear"

status
"revisit"

timeCompleted
45

timeComplexity
"Linear"
*/

const CellModal = ({ open, toggleModal, cardInfo, cards }) => {
  const card = cards[cardInfo.status][cardInfo.index];
  const handleClose = () => {
    toggleModal();
  }

  if (cardInfo.index === -1) {
    return <></>
  }

  return (
    <div>
      <Modal className="modal" open={open} onClose={handleClose}>
        <Box className="modal_card">
          <label>Problem Name</label>
          <input type="text" value={card.problemName}/>
          <label>Platform</label>
          <input type="text" value={card.platform}/>
          <label>Difficulty</label>
          <input type="text" value={card.difficulty}/>
          <label>Completed?</label>
          <input type="text" value={card.completed}/>
          <label>Description</label>
          <input type="text" value={card.description}/>
          <label>Problem Number</label>
          <input type="text" value={card.problemNumber}/>
          <label>Data Structure Type</label>
          <input type="text" value={card.dataStructure}/>
          <label>Inputs</label>
          <input type="text" value={card.inputs}/>
          <label>Expected Output</label>
          <input type="text" value={card.expectedOutput}/>
          <label>Constraints</label>
          <input type="text" value={card.constraints}/>
          <label>Comments</label>
          <input type="text" value={card.Comments}/>

          <Button className="modal_card_btn" size={'large'} color={"secondary"} onClick={() => {
            toggleModal();
          }}>Save Card</Button>
        </Box>
      </Modal>
    </div>
  )
}


export default CellModal;