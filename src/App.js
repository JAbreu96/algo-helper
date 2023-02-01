import './css/App.css';
import MainPage from './pages/MainPage.js';
import CARD_INFO from './constants/CardInfo.js';
import axios from 'axios';
import { Buffer } from 'buffer';

import { useState, useEffect } from 'react';

function App() {
  //User Info
  const [user, updateUserInfo] = useState({});
  //Count
  const [count, updateCount] = useState(0);
  //Selects specific card to populate modal
  const [modalInputs, updateInputs] = useState({ index: -1, status: 'todo' });
  // Cards State
  const [cards, createCards] = useState([
    { status: "todo", RESULT: [], },
    { status: "revisit", RESULT: [] },
    { status: "done", RESULT: [] }
  ])

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

  //Handler to add a card to a list
  const addCard = (status) => {

    CARD_INFO.status = status;
    CARD_INFO.order = cards[status].length + 1;
    console.log(CARD_INFO);

    updateCount(count + 1);

    createCards((item) => {
      return { ...item, [status]: [...cards[status], CARD_INFO] }
    })

  }


  //Handler to select card info for the card Modal
  const populateModal = (index, status) => {
    updateInputs({ index: index, status: status })
  }

  //Handles card info changes
  const changeCardInfo = (cardInfo, property, newValue) => {

    cards[cardInfo.status][cardInfo.index] = { ...cards[cardInfo.status][cardInfo.index], [property]: newValue };

    createCards({ ...cards });
  }

  const fetchUserHandler = async (email, password) => {
    const token = `${process.env.REACT_APP_DUMMY_EMAIL}:${[process.env.REACT_APP_DUMMY_PASS]}`;
    const encodedToken = Buffer.from(token).toString('base64');

    //Config info for fetching user info
    const userConfig = {
      url: 'http://localhost:4000/signin',
      method: 'get',
      headers: {
        'Authorization': 'Basic ' + encodedToken,
      }
    }

    axios(userConfig)
      .then(response => {
        console.log(response.data);
        updateUserHandler(response.data[0]);
      }).catch((err) => {
        console.log(err);
      }).finally(response => {
        return;
      })

  }

  const fetchCardsHandler = async (userId) => {
    console.log(user.id);
    if (userId) {
      const cardsConfig = {
        url: 'http://localhost:4000/cards',
        method: 'get',
        params: {
          userId: user.id
        }
      }
      axios(cardsConfig)
        .then(response => {
          console.log(response.data);
        }).catch((err) => {
          console.log(err);
        }).finally(response => {
          return;
        })
    } else {
      console.log('No Cards found');
    }
  }

  //SIGNS INTO DUMMY USER **TEMPORARY**
  useEffect(() => {
    fetchUserHandler(process.env.REACT_APP_DUMMY_EMAIL, process.env.REACT_APP_DUMMY_PASS);

  }, [])

  useEffect(() => {
    fetchCardsHandler(user.id);
  }, [user])

  const updateUserHandler = function (newInfo) {
    updateUserInfo({ ...newInfo });
  }

  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <MainPage userInfo={user} cardChangeHandler={cardChangeHandler} changeCardInfo={changeCardInfo} cards={cards} addCard={addCard} populateModal={populateModal} modalInputs={modalInputs} />
    </div>
  );
}

export default App;
