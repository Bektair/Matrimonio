import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IWeddingUpdate, IWeddingUpdateTranslation } from '../../API/UpdateWedding';
import { WeddingCss } from '../../constants/weddingCssVariables';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { selectWedding } from '../../redux/selectors/selectWeddingSlice';
import { addWeddingTranslationThunk, updateWeddingThunk } from '../../redux/slices/weddingSlice';
import FontDropDownSelect from '../lists/fontDropDownSelect';
import './weddingUpdate.sass';
import { selectLanguage } from '../../redux/selectors/selectLanguage';
import { IAddWeddingTranslation } from '../../API/AddWeddingTranslation';

function WeddingUpdate() {
    const { register, handleSubmit } = useForm();
    let wedding = useAppSelector(selectWedding);
    let language = useAppSelector(selectLanguage).language;


    let primaryColorElement : any = null;
    let primaryRangeInput : any = null;
    let secoundaryColorElement : any = null;
    let secoundaryRangeInput : any = null;
    let fontColorMain : any = null;
    let fontColorSecound : any = null;
    const weddingSelectedLabel = useRef<HTMLLabelElement>(null);
    const dispatch = useAppDispatch()
    


    const [primaryColor, setPrimaryColor] = useState("");
    const [secoundaryColor, setSecoundaryColor] = useState("");
    const [primaryColorAlpha, setPrimaryColorAlpha] = useState(1); // AS NUMBER for the range
    const [secoundaryColorAlpha, setSecoundaryColorAlpha] = useState(1); // AS NUMBER for the range
    const [backgroundImage, setBackgroundImage] = useState("");
    const [picture, setPicture] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rsvpBody, setRsvpBody] = useState("");
    const [dresscode, setDresscode] = useState("");
    const [primaryFont, setPrimaryFont] = useState("");
    const [secoundaryFont, setSecoundaryFont] = useState("");
    const [secoundaryFontColor, setSecoundaryFontColor] = useState("");
    const [primaryFontColor, setPrimaryFontColor] = useState("");
    const [addTranslation, setAddTranslation] = useState(false);
    
    

    useEffect(() => {
        primaryColorElement = document.getElementById("primaryColorWeddingUpdate");
        primaryRangeInput = document.getElementById("primaryColorRangeWeddingUpdate");
        secoundaryColorElement = document.getElementById("secoundaryColorWeddingUpdate");
        secoundaryRangeInput = document.getElementById("secoundaryColorRangeWeddingUpdate");
        fontColorMain = document.getElementById("fontColorPrimaryWeddingUpdate");
        fontColorSecound = document.getElementById("fontColorSecoundaryWeddingUpdate");


        if(wedding){
            setPrimaryColor(getColorFromColorAlpha(wedding.primaryColor ?? ""));
            setSecoundaryColor(getColorFromColorAlpha(wedding.secoundaryColor ?? ""));
            setPrimaryColorAlpha(getAlphaFromColorAlpha(wedding.primaryColor ?? ""));
            setSecoundaryColorAlpha(getAlphaFromColorAlpha(wedding.secoundaryColor ?? ""));
            setBackgroundImage(wedding.backgroundImage ?? "");
            setPrimaryFont(wedding.bodyFont ?? "");
            setSecoundaryFont(wedding.headingFont ?? "");
            setPrimaryFontColor(wedding.primaryFontColor ?? "#fed3e3");
            setSecoundaryFontColor(wedding.secoundaryFontColor ?? "#d84444");

            setPicture(wedding.picture ?? "#d84444");
            setTitle(wedding.title ?? "#d84444");
            setDescription(wedding.description ?? "#d84444");
            setDresscode(wedding.dresscode ?? "Nice");
            setRsvpBody(wedding.RSVPBody ?? "Hello, do you wish to attend our wedding")
            console.log(wedding)
            console.log("PRIMARY COLOR:" + primaryColor)
            console.log("secoundaryColor:" + secoundaryColor)
            console.log("primaryColorAlpha:" + primaryColorAlpha)
            console.log("secoundaryColorAlpha:" + secoundaryColorAlpha)
            console.log("backgroundImage:" + backgroundImage)
            console.log("primaryFont:" + secoundaryFont)
            console.log("secoundaryFont:" + secoundaryFont)
            console.log("secoundaryFontColor:" + secoundaryFontColor)
            console.log("primaryFontColor:" + primaryFontColor)


        }

        if(primaryColorElement !=null && secoundaryColorElement!=null && fontColorMain !=null && fontColorSecound !=null){
            primaryColorElement.addEventListener("change", colorChangeWithAlphaHandler(WeddingCss.BgColorPrimary, primaryRangeInput), false); //Gets the choosen color :)
            secoundaryColorElement.addEventListener("change", colorChangeWithAlphaHandler(WeddingCss.BgColorSecoundary, secoundaryRangeInput), false); //Gets the choosen color :)
            fontColorMain.addEventListener("change", colorChangeHandler(WeddingCss.FontPrimary), false); //Gets the choosen color :)
            fontColorSecound.addEventListener("change", colorChangeHandler(WeddingCss.FontSecound), false); //Gets the choosen color :)
            
            console.log("Attempted CHANGE")

            
        }


        return () => {
            if (primaryColorElement!=null && secoundaryColorElement!=null && fontColorMain!=null && fontColorSecound!=null) {
                primaryColorElement.removeEventListener("change", colorChangeWithAlphaHandler(WeddingCss.BgColorPrimary, primaryRangeInput), false);
                secoundaryColorElement.removeEventListener("change", colorChangeWithAlphaHandler(WeddingCss.BgColorSecoundary, secoundaryRangeInput), false);
                fontColorMain.removeEventListener("change", colorChangeHandler(WeddingCss.FontPrimary), false); //Gets the choosen color :)
                fontColorSecound.removeEventListener("change", colorChangeHandler(WeddingCss.FontSecound), false); //Gets the choosen color :)
            }
        };
    }, [wedding])

    //Closures
    var colorChangeWithAlphaHandler = function(cssvariable : string, refRange : any){
        return function (event: any){
            var alpha = Number(refRange.value).toString(16);
            document.documentElement.style.setProperty(cssvariable, event.target.value + alpha)
        }
    }

    var colorChangeHandler = function(cssvariable : string){
        return function (event: any){
            console.log("colorChanged")
            document.documentElement.style.setProperty(cssvariable, event.target.value)
            console.log(cssvariable + ":" + event.target.value)
        }
    }

    var alphaChangeHandler = function(cssvariable : string, refColorId : string, stateChange : any){
        return function (event : any){
            console.log("ONCHANGE TRIGGERED!____________________")
            var refColor = document.getElementById(refColorId) as HTMLInputElement;
            if(refColor !=null){
                stateChange(event.target.value)
                refColor.style.opacity = (event.target.value/255).toString();
                var alpha = Number(event.target.value).toString(16);
                document.documentElement.style.setProperty(cssvariable, refColor.value + alpha)
            }            
        }
    }

    function isEmpty(value : any) {
        return (value == null || (typeof value === "string" && value.trim().length === 0));
    }

    function updateWedding (){
        console.log("Trying to ado the form weddingupdate ----------")
        console.log(addTranslation)
  
        if(wedding != undefined){
            if(addTranslation){
                var translationReq = {
                    translation: {
                        title: isEmpty(title) ? undefined : title,
                        description: isEmpty(description) ? undefined : description,
                        dresscode: isEmpty(dresscode) ? undefined : dresscode,
                        isDefaultLanguage: false,
                        language: language,
                        rsvpBody: rsvpBody
                    },
                    weddingId: wedding.id.toString()
                } as IAddWeddingTranslation

                dispatch(addWeddingTranslationThunk(translationReq))
            } else {
                console.log(primaryColorAlpha)
                var alphaMain = new Number(primaryColorAlpha).toString(16);
                console.log(alphaMain)
                console.log("This|" + primaryColorAlpha + "|converts to|" + alphaMain)
                
                var colorMain = primaryColor + alphaMain;
                var alphaSecoundary = new Number(secoundaryColorAlpha).toString(16);
                console.log(secoundaryColorAlpha)
                console.log(alphaSecoundary)
                
                var colorSecoundary = secoundaryColor + alphaSecoundary;

                var WeddingTranslation = {
                    Title: isEmpty(title) ? undefined : title,
                    Description: isEmpty(description) ? undefined : description,
                    Dresscode: isEmpty(dresscode) ? undefined : dresscode,
                    RSVPBody: isEmpty(rsvpBody) ? undefined : rsvpBody,
                } as IWeddingUpdateTranslation

                var Wedding = {
                    PrimaryColor: colorMain,
                    SecoundaryColor: colorSecoundary,
                    PrimaryFontColor: primaryFontColor,
                    SecoundaryFontColor: secoundaryFontColor,
                    BackgroundImage: isEmpty(backgroundImage) ? undefined : backgroundImage,
                    BodyFont: primaryFont,
                    HeadingFont: secoundaryFont,
                    Picture: isEmpty(picture) ? undefined : picture,
                    Translation: WeddingTranslation,
                } as IWeddingUpdate



                console.log("WeddingUpdate:")
                console.log(JSON.stringify(Wedding))

                dispatch(updateWeddingThunk({ id: wedding.id.toString(), weddingUpdate: Wedding, language: language}))
            }
        }


    }

function getColorFromColorAlpha(colorAlpha : string){
    console.log("ALPHA BEFORE" + colorAlpha)

    console.log("ALPHA After" + colorAlpha.slice(0, 7))

    return colorAlpha.slice(0, 7)
}

function getAlphaFromColorAlpha(colorAlpha : string){
    console.log("ALPHACONVERT GET ALPHA VALUE")

    var alphaAsHex = colorAlpha.slice(7, colorAlpha.length);
    console.log(alphaAsHex)

    var alphaValue = parseInt(alphaAsHex, 16);
    console.log(alphaValue)

    return alphaValue;
}

function changedBackground(event : any){
    console.log("FiresOnChange")
    if(wedding){
        setBackgroundImage(event.target.value)
        console.log(event.target.value)
        document.documentElement.style.setProperty(WeddingCss.BgImagePrimary, `url(${event.target.value})`)
    }
}

function colorChangeInstantPrimary(e : any) {
    console.log("INSTANT CHANGE TRIGGER")
    setPrimaryColor(e.target.value)
    document.documentElement.style.setProperty(WeddingCss.BgColorPrimary, e.target.value)
    
}

function colorChangeInstantSecoundary(e : any) {
    console.log("INSTANT CHANGE TRIGGER")
    setSecoundaryColor(e.target.value)
    document.documentElement.style.setProperty(WeddingCss.BgColorSecoundary, e.target.value)
}

function fontChangeInstant(e: any){
    setPrimaryFontColor(e.target.value);
    document.documentElement.style.setProperty(WeddingCss.FontColorMain, e.target.value)
    fontColorMain = document.getElementById("fontColorPrimaryWeddingUpdate");
    fontColorMain.value = e.target.value;
}

function fontChangeInstantSecound(e: any){
    setSecoundaryFontColor(e.target.value)
    document.documentElement.style.setProperty(WeddingCss.FontColorSecoundary, e.target.value)
    fontColorSecound.value = e.target.value;
}

function toggleAddTranslation(){
    setAddTranslation(addTranslation ? false : true)
}


  return (
    <form id='weddingUpdateComponent'  onSubmit={handleSubmit(updateWedding)}>
        <label ref={weddingSelectedLabel}>You have wedding: {wedding?.id} selected</label>
        <label>You have wedding: {wedding?.primaryColor} selected</label>
        <label>You have wedding: {primaryColor} selected</label>
        <div id='customWeddingUpdates'>
            <div className='griditem-wedding'><label>MainColor</label></div>
            <div className='griditem-wedding'><input type='color' {...register("mainColor")} onChange={colorChangeInstantPrimary}  value={primaryColor}   id='primaryColorWeddingUpdate'></input></div>
            <div className='griditem-wedding'><input type="range" {...register("mainColorRange")} onChange={alphaChangeHandler(WeddingCss.BgColorPrimary, "primaryColorWeddingUpdate", setPrimaryColorAlpha)} min="0" max="255" step="1" value={primaryColorAlpha} id="primaryColorRangeWeddingUpdate"/></div>
            
            <div className='griditem-wedding'><label>SecoundaryColor</label></div>
            <div className='griditem-wedding'><input type='color' {...register("secoundaryColor")} onChange={colorChangeInstantSecoundary} value={secoundaryColor} id='secoundaryColorWeddingUpdate' /></div>
            <div className='griditem-wedding'><input type="range" {...register("secoundaryColorRange")} onChange={(alphaChangeHandler(WeddingCss.BgColorSecoundary, "secoundaryColorWeddingUpdate", setSecoundaryColorAlpha))}  min="0" max="255" step="1"  value={secoundaryColorAlpha} id='secoundaryColorRangeWeddingUpdate' /></div>
            
            <div className='griditem-wedding'><label>BackgroundImage</label></div>
            <div className='griditem-wedding'><input type='text' {...register("backgroundImage")} placeholder='link to image' value={backgroundImage} onInput={changedBackground} id='backgroundImageWeddingUpdate' /></div>
            <div className='griditem-wedding'><label></label></div>
            
            <div className='griditem-wedding'><label>FontColor</label></div>
            <div className='griditem-wedding'><div><input type='color' {...register("fontColorMain")}  onChange={fontChangeInstant} value={primaryFontColor ?? "#fed3e3"} id='fontColorPrimaryWeddingUpdate' />
                                                    <input type='color'{...register("fontColorSecound")}  onChange={fontChangeInstantSecound} value={secoundaryFontColor ?? "#d84444"} id='fontColorSecoundaryWeddingUpdate'></input></div></div>
            <div className='griditem-wedding'><div>
                <FontDropDownSelect currentValue={primaryFont} register={register} cssVariable={WeddingCss.FontPrimary} btnName="body"/>
                <FontDropDownSelect currentValue={secoundaryFont} register={register} cssVariable={WeddingCss.FontSecound} btnName="heading" />
            </div></div>

            <div className='griditem-wedding'><label>Picture</label></div>
            <div className='griditem-wedding'><input type='text' {...register("mainImage")} placeholder='link to image' value={picture} onInput={(event : any)=>setPicture(event.target.value)}  /></div>
            <div className='griditem-wedding'></div>

            <div className='griditem-wedding'><label>Title</label></div>
            <div className='griditem-wedding'><input type='text' {...register("title")} placeholder='title' value={title} onInput={(event : any)=>setTitle(event.target.value)}   /></div>
            <div className='griditem-wedding'></div>

            <div className='griditem-wedding'><label>Description</label></div>
            <div className='griditem-wedding'><input type='text' {...register("description")} placeholder='description' value={description} onInput={(event : any)=>setDescription(event.target.value)} /></div>
            <div className='griditem-wedding'></div>

            <div className='griditem-wedding'><label>DressCode</label></div>
            <div className='griditem-wedding'><input type='text' {...register("dresscode")} placeholder='dresscode' value={dresscode} onInput={(event : any)=>setDresscode(event.target.value)}  /></div>
            <div className='griditem-wedding'></div>

            <div className='griditem-wedding'><label>AddTranslation</label></div>
            <div className='griditem-wedding'><input type='checkbox' checked={addTranslation} onClick={toggleAddTranslation} {...register("translation")} placeholder='translation'/></div>
            <div className='griditem-wedding'></div>
        </div>
        <button type='submit'>Update</button> 
    </form>
  )
}

export default WeddingUpdate