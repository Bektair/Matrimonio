import { ReactNode, useRef, useState } from 'react';
import { useAppDispatch } from '../../redux/Hooks/hooks';
import { createAWedding } from '../../redux/slices/weddingsSlice';
import { WeddingDefaults } from '../../constants/weddingDefaults';

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
      dresscode: e.target.dresscode.value,
      backgroundImage: WeddingDefaults.DEFAULT_BACKGROUND_IMG,
      bodyFont: WeddingDefaults.DEFAULT_BODY_FONT,
      headingFont: WeddingDefaults.DEFAULT_HEADING_FONT,
      picture: e.target.picture.value,
      primaryColor: WeddingDefaults.DEFAULT_BG_COLOR,
      primaryFontColor: WeddingDefaults.DEFAULT_FONT_COLOR,
      secoundaryColor: WeddingDefaults.DEFAULT_BG_COLOR_SECOUNDARY,
      secoundaryFontColor: WeddingDefaults.DEFAULT_FONT_COLOR_SECOUNDARY,
      title: e.target.title.value,
      isDefaultLanguage: true,
      language: e.target.language.value
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
      <input type='text' id="picture" placeholder='Picture'></input>
      <input type='text' id="title" placeholder='Title'></input>
      <input type='text' id="language" placeholder='language'></input>
      {renderButton()}
    </form>

  )
}

export default CreateWeddingForm