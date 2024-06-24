import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IWeddingUpdate } from '../../API/UpdateWedding';
import { WeddingCss } from '../../constants/weddingCssVariables';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { selectWedding } from '../../redux/selectors/selectWeddingSlice';
import { updateWeddingThunk } from '../../redux/slices/weddingSlice';
import FontDropDownSelect from '../lists/fontDropDownSelect';
import './weddingUpdate.sass';

function WeddingUpdate() {
    const { register, handleSubmit } = useForm();
    let wedding = useAppSelector(selectWedding);


    let primaryColorElement : any = null;
    let primaryRangeInput : any = null;
    let secoundaryColorElement : any = null;
    let secoundaryRangeInput : any = null;
    let fontColorMain : any = null;
    let fontColorSecound : any = null;
    const weddingSelectedLabel = useRef<HTMLLabelElement>(null);
    const backgroundImageLabel = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch()
    


    const [primaryColor, setPrimaryColor] = useState("");
    const [secoundaryColor, setSecoundaryColor] = useState("");
    const [primaryColorAlpha, setPrimaryColorAlpha] = useState(1); // AS NUMBER for the range
    const [secoundaryColorAlpha, setSecoundaryColorAlpha] = useState(1); // AS NUMBER for the range
    const [backgroundImage, setBackgroundImage] = useState("");
    const [primaryFont, setPrimaryFont] = useState("");
    const [secoundaryFont, setSecoundaryFont] = useState("");
    const [secoundaryFontColor, setSecoundaryFontColor] = useState("");
    const [primaryFontColor, setPrimaryFontColor] = useState("");
    
    

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



 
    function backgroundImageChange(event : any){
        console.log(event.target.value)
        document.documentElement.style.setProperty(WeddingCss.BgImagePrimary, `url(${backgroundImageLabel.current?.value})`)
    }

    function updateWedding (){



        console.log("UpdateWedding!")
  
        if(wedding != undefined){
            console.log(primaryColorAlpha)
            var alphaMain = new Number(primaryColorAlpha).toString(16);
            console.log(alphaMain)
            console.log("This|" + primaryColorAlpha + "|converts to|" + alphaMain)
            
            var colorMain = primaryColor + alphaMain;
            var alphaSecoundary = new Number(secoundaryColorAlpha).toString(16);
            console.log(secoundaryColorAlpha)
            console.log(alphaSecoundary)
            
            var colorSecoundary = secoundaryColor + alphaSecoundary;


            var Wedding = {
                PrimaryColor: colorMain,
                SecoundaryColor: colorSecoundary,
                PrimaryFontColor: primaryFontColor,
                SecoundaryFontColor: secoundaryFontColor,
                BackgroundImage: backgroundImage,
                BodyFont: primaryFont,
                HeadingFont: secoundaryFont            
            } as IWeddingUpdate
            console.log("WeddingUpdate:")
            console.log(JSON.stringify(Wedding))

            dispatch(updateWeddingThunk({ id: wedding.id.toString(), weddingUpdate: Wedding}))
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
    if(wedding)
        setBackgroundImage(event.target.value)
}


  return (
    <form id='weddingUpdateComponent'  onSubmit={handleSubmit(updateWedding)}>
        <label ref={weddingSelectedLabel}>You have wedding: {wedding?.id} selected</label>
        <label>You have wedding: {wedding?.primaryColor} selected</label>
        <label>You have wedding: {primaryColor} selected</label>
        <div id='customWeddingUpdates'>
            <div className='griditem-wedding'><label>MainColor</label></div>
            <div className='griditem-wedding'><input type='color' {...register("mainColor")} onChange={(e)=>setPrimaryColor(e.target.value)}  value={primaryColor}   id='primaryColorWeddingUpdate'></input></div>
            <div className='griditem-wedding'><input type="range" {...register("mainColorRange")} onChange={alphaChangeHandler(WeddingCss.BgColorPrimary, "primaryColorWeddingUpdate", setPrimaryColorAlpha)} min="0" max="255" step="1" value={primaryColorAlpha} id="primaryColorRangeWeddingUpdate"/></div>
            <div className='griditem-wedding'><label>SecoundaryColor</label></div>
            <div className='griditem-wedding'><input type='color' {...register("secoundaryColor")} onChange={(e)=>setSecoundaryColor(e.target.value)} value={secoundaryColor} id='secoundaryColorWeddingUpdate' /></div>
            <div className='griditem-wedding'><input type="range" {...register("secoundaryColorRange")} onChange={(alphaChangeHandler(WeddingCss.BgColorSecoundary, "secoundaryColorWeddingUpdate", setSecoundaryColorAlpha))}  min="0" max="255" step="1"  value={secoundaryColorAlpha} id='secoundaryColorRangeWeddingUpdate' /></div>
            <div className='griditem-wedding'><label>BackgroundImage</label></div>
            <div className='griditem-wedding'><input type='text' {...register("backgroundImage")} placeholder='link to image' value={backgroundImage} onInput={changedBackground} onSubmit={backgroundImageChange} id='backgroundImageWeddingUpdate' /></div>
            <div className='griditem-wedding'><label></label></div>
            <div className='griditem-wedding'><label>FontColor</label></div>
            <div className='griditem-wedding'><div><input type='color' {...register("fontColorMain")}  onChange={(e)=>setPrimaryFontColor(e.target.value)} value={primaryFontColor ?? "#fed3e3"} id='fontColorPrimaryWeddingUpdate' />
                                                    <input type='color'{...register("fontColorSecound")}  onChange={(e)=>setSecoundaryFontColor(e.target.value)} value={secoundaryFontColor ?? "#d84444"} id='fontColorSecoundaryWeddingUpdate'></input></div></div>
            <div className='griditem-wedding'><div>
                <FontDropDownSelect currentValue={primaryFont} register={register} cssVariable={WeddingCss.FontPrimary} btnName="body"/>
                <FontDropDownSelect currentValue={secoundaryFont} register={register} cssVariable={WeddingCss.FontSecound} btnName="heading" />
            </div></div>
        </div>
        <button type='submit'>Submit</button> 
    </form>
  )
}

export default WeddingUpdate