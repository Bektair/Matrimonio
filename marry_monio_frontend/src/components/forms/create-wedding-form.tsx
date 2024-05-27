import React, { DOMElement, ReactNode, useRef, useState } from 'react'
import { useAppDispatch } from '../../redux/Hooks/hooks'
import { createAWedding } from '../../redux/slices/weddingsSlice';

function CreateWeddingForm() {
    const dispatch = useAppDispatch()

    const formRef = useRef(null); //Value not required for rendering must be null for dom element
    const [loading, setLoading] = useState(false)

  async function formAction(e: any) {
    setLoading(true);

    e.preventDefault();

    console.log(e.target.dresscode.value);
    console.log(e.target.description.value);
    
    dispatch(createAWedding({
      description: e.target.description.value,
      dresscode: e.target.dresscode.value
    }))

    setTimeout(function () {
      setLoading(false);
    }, 1000)

  }

  function renderButton() : ReactNode {
     return loading ? <label>Loading</label> : <button type="submit">Create Wedding</button>
  }

  return (
    <form ref={formRef} onSubmit={formAction}>
      <input type='text' id="dresscode" placeholder='DressCode'></input>
      <input type='text' id="description" placeholder='Description'></input>
      {renderButton()}
    </form>

  )
}

export default CreateWeddingForm