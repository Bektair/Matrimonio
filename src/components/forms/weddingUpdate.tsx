import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { selectWedding, updateWeddingThunk } from '../../redux/slices/weddingSlice';
import './weddingUpdate.sass'
import FontDropdown from '../lists/fontDropdown';
import { useForm } from 'react-hook-form';
import { IWeddingUpdate } from '../../API/UpdateWedding';

function WeddingUpdate() {
    const { register, handleSubmit } = useForm();
    let wedding = useAppSelector(selectWedding);
    const mainColor = useRef<HTMLInputElement>(null);
    const secoundColor = useRef<HTMLInputElement>(null);
    const fontColorMain = useRef<HTMLInputElement>(null);
    const fontColorSecound = useRef<HTMLInputElement>(null);
    const weddingSelectedLabel = useRef<HTMLLabelElement>(null);
    const backgroundImageInput = useRef<HTMLInputElement>(null);
    const mainRangeInput = useRef<HTMLInputElement>(null);
    const secoundaryRangeInput = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch()

    
    

    useEffect(() => {
        if(mainColor.current!=null && secoundColor.current!=null && fontColorMain.current!=null && fontColorSecound.current!=null){
            mainColor.current.addEventListener("change", colorChangeWithAlphaHandler("--primary-bg-color", mainRangeInput), false); //Gets the choosen color :)
            secoundColor.current.addEventListener("change", colorChangeWithAlphaHandler("--secoundary-bg-color", secoundaryRangeInput), false); //Gets the choosen color :)
            fontColorMain.current.addEventListener("change", colorChangeHandler("--font-color-main"), false); //Gets the choosen color :)
            fontColorSecound.current.addEventListener("change", colorChangeHandler("--font-color-secoundary"), false); //Gets the choosen color :)
        }


        return () => {
            if (mainColor.current!=null && secoundColor.current!=null && fontColorMain.current!=null && fontColorSecound.current!=null) {
                mainColor.current.removeEventListener("change", colorChangeWithAlphaHandler("--primary-bg-color", mainRangeInput), false);
                secoundColor.current.removeEventListener("change", colorChangeWithAlphaHandler("--secoundary-bg-color", secoundaryRangeInput), false);
                fontColorMain.current.removeEventListener("change", colorChangeHandler("--font-color-main"), false); //Gets the choosen color :)
                fontColorSecound.current.removeEventListener("change", colorChangeHandler("--font-color-secoundary"), false); //Gets the choosen color :)
            }
        };
    }, [])
    //Save as State?
    //I can update the currently selected wedding, but it will not persist the changes.
    //First just see with current.

    //Closures
    var colorChangeWithAlphaHandler = function(cssvariable : string, refRange : React.RefObject<HTMLInputElement>){
        return function (event: any){
            var alpha = Number(refRange.current?.value).toString(16);
            document.documentElement.style.setProperty(cssvariable, event.target.value + alpha)
        }
    }

    var colorChangeHandler = function(cssvariable : string){
        return function (event: any){
            document.documentElement.style.setProperty(cssvariable, event.target.value)
            console.log(cssvariable + ":" + event.target.value)
        }
    }

    var alphaChangeHandler = function(cssvariable : string, refColor : React.RefObject<HTMLInputElement>){
        return function (event : any){
            if(refColor.current!=null){
                refColor.current.style.opacity = (event.target.value/255).toString();
                var alpha = Number(event.target.value).toString(16);
                document.documentElement.style.setProperty(cssvariable, refColor.current.value + alpha)
            }
        }
    }

 
    function backgroundImageChange(event : any){
        console.log(event.target.value)
        document.documentElement.style.setProperty('--main-bg-image', `url(${backgroundImageInput.current?.value})`)
    }

    async function updateWedding (formData : any){
        console.log("UpdateWedding!")
        console.log(formData)
        console.log(formData.mainColor)
        console.log(formData.mainColorRange)
        console.log(formData.secoundaryColor)
        console.log(formData.secoundaryColorRange)
        console.log(formData.backgroundImage)
        console.log(formData.fontColorMain)
        console.log(formData.fontColorSecound)
        console.log(formData.activeFontbody)
        console.log(formData.activeFontheading)
        if(wedding != undefined){

            var colorMain = formData.mainColor + formData.mainColorRange;
            var colorSecoundary = formData.secoundaryColor + formData.secoundaryColorRange;

            console.log(formData.numberOfGuests)
            var Wedding = {
                MainColor: colorMain,
                SecoundaryColor: colorSecoundary,
                MainFontColor: formData.fontColorMain,
                SecoundaryFontColor: formData.fontColorSecound,
                BackgroundImage: formData.backgroundImage,
                BodyFont: formData.activeFontbody,
                HeadingFont: formData.activeFontheading            
            } as IWeddingUpdate
            console.log("WeddingUpdate:")
            console.log(JSON.stringify(Wedding))

            dispatch(updateWeddingThunk({ id: wedding.id.toString(), RSVP: Wedding}))
        }


      }
  return (
    <form id='weddingUpdateComponent' onSubmit={handleSubmit(updateWedding)}>
        <label ref={weddingSelectedLabel}>You have wedding: {wedding?.id} selected</label>
        <div id='customWeddingUpdates'>
            <div className='griditem-wedding'><label>MainColor</label></div>
            <div className='griditem-wedding' ><input type='color' {...register("mainColor")}  defaultValue="#161313" ref={mainColor} id='maincolor'></input></div>
            <div className='griditem-wedding'><input type="range" {...register("mainColorRange")} onChange={alphaChangeHandler('--primary-bg-color', mainColor)} ref={mainRangeInput} min="0" max="255" step="1" defaultValue="100"></input></div>
            <div className='griditem-wedding'><label>SecoundaryColor</label></div>
            <div className='griditem-wedding'><input type='color' {...register("secoundaryColor")} defaultValue="#d3d3d3" ref={secoundColor}></input></div>
            <div className='griditem-wedding'><input type="range" {...register("secoundaryColorRange")} onChange={alphaChangeHandler('--secoundary-bg-color', secoundColor)} ref={secoundaryRangeInput} min="0" max="255" step="1" defaultValue="100"></input></div>
            <div className='griditem-wedding'><label>BackgroundImage</label></div>
            <div className='griditem-wedding'><input type='text' {...register("backgroundImage")} placeholder='link to image' ref={backgroundImageInput} onSubmit={backgroundImageChange}></input></div>
            <div className='griditem-wedding'><label></label></div>
            <div className='griditem-wedding'><label>FontColor</label></div>
            <div className='griditem-wedding'><div><input type='color' {...register("fontColorMain")} ref={fontColorMain} defaultValue="#fed3e3"></input>
                                                    <input type='color'{...register("fontColorSecound")}  ref={fontColorSecound} defaultValue="#d84444"></input></div></div>
            <div className='griditem-wedding'><div>
            <FontDropdown register={register} cssVariable="--font-main" btnName="body"></FontDropdown>
            <FontDropdown register={register}  btnName="heading" cssVariable="--font-secound"></FontDropdown></div></div>
        </div>
        <button  type='submit'>Submit</button> 
    </form>
  )
}

export default WeddingUpdate