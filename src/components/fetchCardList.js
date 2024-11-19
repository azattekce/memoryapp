import localStorageService from './localStorageService';

export const fetchCardList =async () => {


 const level = localStorageService.get('level'); 
 let cardList = [];
console.log('Level:{0}',level);

 if (level!==null) {   
    for (let i = 1; i <=level; i++) {
      cardList.push({  path: `/img/${i}.jpeg`, id: i });
    }
 }else
 {
    localStorageService.set('level', 4);
 }
 // Define the list of card objects 
  // Return the card list
  return cardList;
  
  };
export default fetchCardList;
