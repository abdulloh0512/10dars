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
          {id:"1",title:"Bajarilishi kerak",items:[{id:"cdrFt",title:"Task 1"}]},
          {id:"2",title:"Bajarilayotgan",items:[{id:"cdrFv",title:"Task 1"}]},
          {id:"3",title:"Tugagan",items:[{id:"cdrFb",title:"Task 1"}]}
        ]
      }
    ]
  }
  const [allboard,setAllBoard] = useState(boardData); 
  
  return (
    <>

    <BoardContext.Provider value={{allboard,setAllBoard}}>
      <div className='content flex w-[900px] mx-auto absolute top-[40%] left-[28%] '>
        <Main></Main>
      </div>
    </BoardContext.Provider>
    </>
  )
}

export default App

