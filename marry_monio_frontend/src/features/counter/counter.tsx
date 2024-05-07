import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'

import { decrement, increment } from './counterSlice'
import { Button } from 'react-bootstrap'

export function Counter() {


  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return <>
    <Button
     onClick={() => {dispatch(increment())}}
    >
        IncrementMe
    </Button>

    <label>{count}</label>
  
  
  </>

  // omit rendering logic
}