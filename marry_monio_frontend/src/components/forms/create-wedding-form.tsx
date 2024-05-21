import React, { DOMElement, useRef } from 'react'
import { useAppDispatch } from '../../redux/Hooks/hooks'
import { createAWedding } from '../../redux/slices/weddingSlice';

function CreateWeddingForm() {
    const dispatch = useAppDispatch()

    const formRef = useRef(null); //Value not required for rendering must be null for dom element
    const dresscodeRef = useRef(null); //Value not required for rendering must be null for dom element

  async function formAction(e: any) {

    e.preventDefault();

    console.log(e.target.dresscode.value);
    console.log(e.target.description.value);
    
    dispatch(createAWedding({
      description: e.target.description.value,
      dresscode: e.target.dresscode.value
    }))

    //console.log(e.target)

  }


  return (
    <form ref={formRef} onSubmit={formAction}>
      <input type='text' id="dresscode" placeholder='DressCode'></input>
      <input type='text' id="description" placeholder='Description'></input>

      <button type="submit">
          Create Wedding
      </button>
    </form>
  )
}

export default CreateWeddingForm