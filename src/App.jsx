import { useState } from 'react';
import './App.css';
import Main from './components/Main';
import { BoardContext } from './context/BoardContext';



function App() {
  const boardData = {
    active:0,
    boards:[
      {
        name:'My Trello Board',
        bgcolor:'#069',
        list:[
          {id:"1",title:"Bajarilishi kerak",items:[{id:"cdrFt",title:"Nimadir qilish"}]},
          {id:"2",title:"Bajarilayotgan",items:[{id:"cdrFv",title:"Qandaydir Task"}]},
          {id:"3",title:"Testing",items:[{id:"cdrFb",title:"Qandaydir Task 1"}]}
        ]
      }
    ]
  }
  const [allboard,setAllBoard] = useState(boardData); 
  
  return (
    <>

    <BoardContext.Provider value={{allboard,setAllBoard}}>
      <div className='content flex w-[100%] mx-auto'>
        <Main></Main>
      </div>
    </BoardContext.Provider>
    </>
  )
}

export default App

