import React, {useState, useCallback} from 'react';
import update from 'immutability-helper';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ListColumn from './ListColumn.js';
import { ItemTypes } from '../utility/DragTypes.js';
import { useDrop } from 'react-dnd';

import '../css/DragnDropContainer.css';
const DragnDropContainer = ({ x, y, children }) => {

  // const [{ isOver }, drop] = useDrop(() => ({
  //   accept: ItemTypes.CARD,
  //   // drop: () => moveCard(x,y),
  //   collect: monitor => ({
  //     isOver: !!monitor.isOver(),
  //   })
  // }), [x, y]);

  const [cards, setCards] = useState([
    {
      id: 1,
      text: "Card 1"
    },
    {
      id: 2,
      text: "Card 2"
    }
  ])


  //Updates new State with card at different position
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) => 
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]]
        ],
      }),
    )
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="lists-container">
        <ListColumn cards={cards} moveCard={moveCard}/>
        <ListColumn cards={[]} moveCard={moveCard}/>
        {/* <ListColumn /> */}
      </section>
    </ DndProvider>
  )
}

export default DragnDropContainer;