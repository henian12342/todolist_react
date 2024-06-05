import React, { act, useReducer, useState } from 'react'

const TestComp = () => {
  const [count, setCount] = useState(0);
  
  const increase = () => {
    return setCount(count + 1)
  }
  const decrease = () => {
    return setCount(count - 1)
  }

  // const reducer = (state, action) => {
  //   switch(action.type){
  //     case 'INCREASE' : return state + action.data;
  //     case 'DECREASE' : return state - action.data;
  //     case 'LIMITED' : return (alert(action.data), (state + action.data) *2);
  //     default : return state;
  //   }
  // }
  // const [count, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      <h4>테스트 컴포넌트!!!</h4>
      <div>
        <strong style={{fontSize : '30px'}}>{count}</strong>
      </div>
      <div>
        {/* <button onClick={()=>dispatch({type : 'INCREASE', data : 1})}>+1</button>
        <button onClick={()=>dispatch({type : 'DECREASE', data : 1})}>-1</button>
        <button onClick={()=>dispatch({type : 'LIMITED', data : 1})}>LIMITED</button> */}

        <button onClick={increase}>+1</button>
        <button onClick={decrease}>-1</button>
        <button>LIMITED</button>
      </div>
    </div>
  )
}

export default TestComp