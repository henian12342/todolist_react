import React, { useCallback, useMemo, useReducer, useRef, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import TodoEditor from './Components/TodoEditor';
import TodoList from './Components/TodoList';

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();


const MockTodo = [
  {
    id : 0,
    isDone : false,
    content : 'React 공부하기',
    createDate : new Date().getTime()
  },
  {
    id : 1,
    isDone : false,
    content : 'Javascript 공부하기',
    createDate : new Date().getTime()
  },
  {
    id : 2,
    isDone : false,
    content : '영화보기',
    createDate : new Date().getTime()
  },
  {
    id : 3,
    isDone : false,
    content : '노래 연습하기',
    createDate : new Date().getTime()
  }
]; 
  
function reducer( state, action ) {
  // 상태 변화 코드들...
  switch(action.type){
    case 'CREATE' : {
      return [action.newItem, ...state];
    }
    case 'UPDATE' : {
      return state.map( list => 
        list.id === action.targetID ? 
        {...list, 
          isDone : !list.isDone
        } :
        list
      )
    }
    case 'DELETE' : {
      return state.filter(list => list.id !== action.targetID);
    }
    default : return state;
  };
}

function App() {
  const idRef = useRef(4);
  const [todo, dispatch] = useReducer(reducer, MockTodo);

  // 이벤트 : 데이터 추가(목록 추가)
  const onCreate = (content) => {
    dispatch({
      type : 'CREATE',
      newItem : {
        id : idRef.current,
        content,
        isDone : false,
        createDate : new Date().getTime()
      }
    });
    idRef.current += 1
  };

  const onUpdate = useCallback((targetID) => {
    dispatch({
      type : 'UPDATE',
      targetID
    })
  },[]);

  const onDelete = useCallback((targetID) => {
    dispatch({
      type : 'DELETE',
      targetID
    });
  },[]);

  const memorizeDispatches = useMemo(() => {
    return {onCreate, onUpdate, onDelete}
  },[]);

  return (
    <div className='App'>
      <Header/>
      <TodoStateContext.Provider value={todo}>
        <TodoDispatchContext.Provider value={memorizeDispatches}>
          <TodoEditor/>
          <TodoList/>
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
