import { useEffect, useState } from 'react';
import './App.css';
import MemoryCard from './components/MemoryCard';
import fetchCardList from './components/fetchCardList';


function App() {
  const [cards, setCards] = useState([]);
  const [selectedOne, setSelectedOne] = useState(null);
  const [selectedTwo, setSelectedTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [sayac, setSayac] = useState(0);

  const prepareCards =async () => {
    const cardList =await fetchCardList();
  
    const sortedCards = [...cardList, ...cardList]
      .sort(() => 0.5 - Math.random())
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(sortedCards);
    setSelectedOne(null);
    setSelectedTwo(null);
    setScore(0);
    setSayac(10);
  }

  const handleSelected = (card) => {
    selectedOne ? setSelectedTwo(card) : setSelectedOne(card);
  }

  useEffect(() => {
    prepareCards();
  }, []);

  useEffect(() => {
    if(selectedOne && selectedTwo) {
      setDisabled(true);
      if(selectedOne.path === selectedTwo.path) {
        setScore(prevScore => prevScore + 1);
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.path === selectedOne.path) {
              return { ...card, matched: true }
            } else {
              return card;
            }
          })
        })
        resetState();
      } else {
        setTimeout(() => {
          resetState();
        }, 1000);
      }
    }
  }, [selectedOne, selectedTwo]);

  const resetState = () => {
    setSelectedOne(null);
    setSelectedTwo(null);
    setDisabled(false);   
    setSayac(prevSayac => prevSayac - 1);
  }


  return (
    <div className="container">
    
      <h1>Memory App</h1>
      <button onClick={prepareCards} className='button'>Restart</button><br></br>
      <button className='buttonSayac'>Counter: {sayac}</button>
      <p>Lavel:{ score }</p>
     
      <div className="card-grid">
        {
          cards.map(card => (
            <MemoryCard 
              card={card} 
              key={card.id} 
              handleSelected={handleSelected}
              disabled={disabled}
              rotated={card === selectedOne || card === selectedTwo || card.matched} 
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
