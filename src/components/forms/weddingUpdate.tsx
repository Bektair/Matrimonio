import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import {  updateWeddingThunk } from '../../redux/slices/weddingSlice';
import './weddingUpdate.sass'
import FontDropdown from '../lists/fontDropdown';
import { useForm } from 'react-hook-form';
import { IWeddingUpdate } from '../../API/UpdateWedding';
import { selectWedding } from '../../redux/selectors/selectWeddingSlice';

function WeddingUpdate() {
    const { register, handleSubmit } = useForm();
    let wedding = useAppSelector(selectWedding);
    let primaryColor : any = null;
    let primaryRangeInput : any = null;
    let secoundaryColor : any = null;
    let secoundaryRangeInput : any = null;
    let fontColorMain : any = null;
    let fontColorSecound : any = null;
    const backgroundImage = document.getElementById("backgroundImageWeddingUpdate")
    const activeFontheading = document.getElementById("activeFontheading")
    const activeFontbody = document.getElementById("activeFontbody")
    const weddingSelectedLabel = useRef<HTMLLabelElement>(null);
    const backgroundImageLabel = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch()

    
    

    useEffect(() => {
        primaryColor = document.getElementById("primaryColorWeddingUpdate");
        primaryRangeInput = document.getElementById("primaryColorRangeWeddingUpdate");
        secoundaryColor = document.getElementById("secoundaryColorWeddingUpdate");
        secoundaryRangeInput = document.getElementById("secoundaryColorRangeWeddingUpdate");
        fontColorMain = document.getElementById("fontColorPrimaryWeddingUpdate")
        fontColorSecound = document.getElementById("fontColorSecoundaryWeddingUpdate")


        if(primaryColor !=null && secoundaryColor!=null && fontColorMain !=null && fontColorSecound !=null){
            primaryColor.addEventListener("change", colorChangeWithAlphaHandler("--primary-bg-color", primaryRangeInput), false); //Gets the choosen color :)
            secoundaryColor.addEventListener("change", colorChangeWithAlphaHandler("--secoundary-bg-color", secoundaryRangeInput), false); //Gets the choosen color :)
            fontColorMain.addEventListener("change", colorChangeHandler("--font-color-main"), false); //Gets the choosen color :)
            fontColorSecound.addEventListener("change", colorChangeHandler("--font-color-secoundary"), false); //Gets the choosen color :)
        }


        return () => {
            if (primaryColor!=null && secoundaryColor!=null && fontColorMain!=null && fontColorSecound!=null) {
                primaryColor.removeEventListener("change", colorChangeWithAlphaHandler("--primary-bg-color", primaryRangeInput), false);
                secoundaryColor.removeEventListener("change", colorChangeWithAlphaHandler("--secoundary-bg-color", secoundaryRangeInput), false);
                fontColorMain.removeEventListener("change", colorChangeHandler("--font-color-main"), false); //Gets the choosen color :)
                fontColorSecound.removeEventListener("change", colorChangeHandler("--font-color-secoundary"), false); //Gets the choosen color :)
            }
        };
    }, [])
    //Save as State?
    //I can update the currently selected wedding, but it will not persist the changes.
    //First just see with current.

    //Closures
    var colorChangeWithAlphaHandler = function(cssvariable : string, refRange : any){
        return function (event: any){
            var alpha = Number(refRange.value).toString(16);
            document.documentElement.style.setProperty(cssvariable, event.target.value + alpha)
        }
    }

    var colorChangeHandler = function(cssvariable : string){
        return function (event: any){
            document.documentElement.style.setProperty(cssvariable, event.target.value)
            console.log(cssvariable + ":" + event.target.value)
        }
    }

    var alphaChangeHandler = function(cssvariable : string, refColorId : string){
        return function (event : any){
            var refColor = document.getElementById(refColorId) as HTMLInputElement;
            if(refColor !=null){
                refColor.style.opacity = (event.target.value/255).toString();
                var alpha = Number(event.target.value).toString(16);
                document.documentElement.style.setProperty(cssvariable, refColor.value + alpha)
            }
        }
    }

 
    function backgroundImageChange(event : any){
        console.log(event.target.value)
        document.documentElement.style.setProperty('--main-bg-image', `url(${backgroundImageLabel.current?.value})`)
    }

    function updateWedding (formData : any){
        console.log("UpdateWedding!")
        console.log(formData)
        console.log(formData.backgroundImage)
        console.log(formData.fontColorMain)
        console.log(formData.fontColorSecound)
        console.log(formData.activeFontbody)
        console.log(formData.activeFontheading)
        if(wedding != undefined){
            var alphaMain = Number(formData.mainColorRange).toString(16);
            var colorMain = formData.mainColor + alphaMain;
            var alphaSecoundary = Number(formData.secoundaryColorRange).toString(16);
            var colorSecoundary = formData.secoundaryColor + alphaSecoundary;
            console.log(colorMain)
            console.log(colorSecoundary)


            var Wedding = {
                PrimaryColor: colorMain,
                SecoundaryColor: colorSecoundary,
                PrimaryFontColor: formData.fontColorMain,
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

      function onSubmit(data : any) {
        console.log("ComeON")
        console.log(data)
      }
  return (
    <form id='weddingUpdateComponent'  onSubmit={handleSubmit(updateWedding)}>
        <label ref={weddingSelectedLabel}>You have wedding: {wedding?.id} selected</label>
        <div id='customWeddingUpdates'>
            <div className='griditem-wedding'><input type='color' {...register("mainColor")}  defaultValue="#161313"  id='primaryColorWeddingUpdate'></input></div>
            <div className='griditem-wedding'><label>MainColor</label></div>
            <div className='griditem-wedding'><input type="range" {...register("mainColorRange")} onChange={alphaChangeHandler('--primary-bg-color', "primaryColorWeddingUpdate")} min="0" max="255" step="1" defaultValue="100" id="primaryColorRangeWeddingUpdate"/></div>
            <div className='griditem-wedding'><label>SecoundaryColor</label></div>
            <div className='griditem-wedding'><input type='color' {...register("secoundaryColor")} defaultValue="#d3d3d3" id='secoundaryColorWeddingUpdate' /></div>
            <div className='griditem-wedding'><input type="range" {...register("secoundaryColorRange")} onChange={alphaChangeHandler('--secoundary-bg-color', "secoundaryColorWeddingUpdate")}  min="0" max="255" step="1" defaultValue="100" id='secoundaryColorRangeWeddingUpdate' /></div>
            <div className='griditem-wedding'><label>BackgroundImage</label></div>
            <div className='griditem-wedding'><input type='text' {...register("backgroundImage")} placeholder='link to image'  onSubmit={backgroundImageChange} id='backgroundImageWeddingUpdate' /></div>
            <div className='griditem-wedding'><label></label></div>
            <div className='griditem-wedding'><label>FontColor</label></div>
            <div className='griditem-wedding'><div><input type='color' {...register("fontColorMain")}  defaultValue="#fed3e3" id='fontColorPrimaryWeddingUpdate' />
                                                    <input type='color'{...register("fontColorSecound")}   defaultValue="#d84444" id='fontColorSecoundaryWeddingUpdate'></input></div></div>
            <div className='griditem-wedding'><div>
                <FontDropdown register={register} cssVariable="--font-main" btnName="body"></FontDropdown>
                <FontDropdown register={register}  btnName="heading" cssVariable="--font-secound"></FontDropdown>
            </div></div>
        </div>
        <button  type='submit'>Submit</button> 
    </form>
  )
}

export default WeddingUpdate