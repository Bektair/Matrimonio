import React, { useEffect, useRef } from 'react'
import { useAppSelector } from '../../redux/Hooks/hooks';
import { selectWedding } from '../../redux/slices/weddingSlice';
import './weddingUpdate.sass'
import FontDropdown from '../lists/fontDropdown';

function WeddingUpdate() {
    let wedding = useAppSelector(selectWedding);
    const mainColor = useRef<HTMLInputElement>(null);
    const secoundColor = useRef<HTMLInputElement>(null);
    const fontColorMain = useRef<HTMLInputElement>(null);
    const fontColorSecound = useRef<HTMLInputElement>(null);
    const weddingSelectedLabel = useRef<HTMLLabelElement>(null);
    const backgroundImageInput = useRef<HTMLInputElement>(null);
    const mainRangeInput = useRef<HTMLInputElement>(null);
    const secoundaryRangeInput = useRef<HTMLInputElement>(null);
    
    
    

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


  return (
    <div id='weddingUpdateComponent'>
        <label ref={weddingSelectedLabel}>You have wedding: {wedding?.id} selected</label>
        <div id='customWeddingUpdates'>
            <div className='griditem-wedding'><label>MainColor</label></div>
            <div className='griditem-wedding'><input type='color' defaultValue="#161313" ref={mainColor} id='maincolor'></input></div>
            <div className='griditem-wedding'><input type="range" onChange={alphaChangeHandler('--primary-bg-color', mainColor)} ref={mainRangeInput} min="0" max="255" step="1" defaultValue="100"></input></div>
            <div className='griditem-wedding'><label>SecoundaryColor</label></div>
            <div className='griditem-wedding'><input type='color' defaultValue="#d3d3d3" ref={secoundColor}></input></div>
            <div className='griditem-wedding'><input type="range" onChange={alphaChangeHandler('--secoundary-bg-color', secoundColor)} ref={secoundaryRangeInput} min="0" max="255" step="1" defaultValue="100"></input></div>
            <div className='griditem-wedding'><label>BackgroundImage</label></div>
            <div className='griditem-wedding'><input type='text' placeholder='link to image' ref={backgroundImageInput} onSubmit={backgroundImageChange}></input></div>
            <div className='griditem-wedding'><label></label></div>
            <div className='griditem-wedding'><label>FontColor</label></div>
            <div className='griditem-wedding'><div><input type='color' ref={fontColorMain} defaultValue="#fed3e3"></input>
                                                    <input type='color' ref={fontColorSecound} defaultValue="#d84444"></input></div></div>
            <div className='griditem-wedding'><div><FontDropdown cssVariable="--font-main" btnName="body"></FontDropdown><FontDropdown btnName="heading" cssVariable="--font-secound"></FontDropdown></div></div>
        </div>
        <button onClick={backgroundImageChange}>Submit</button> 
    </div>
  )
}

export default WeddingUpdate