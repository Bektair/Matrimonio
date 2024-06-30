import { MutableRefObject, useRef, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { WeddingDefaults } from "../../constants/weddingDefaults";



interface sentProps{
    cssVariable: string
    btnName: string
    register: UseFormRegister<FieldValues>
    currentValue: string
  }

function FontDropDownSelect(sentProps : sentProps) {


    const [computedStylesArray, setComputedStyles] = useState(WeddingDefaults.DEFAULT_BODY_FONT);
    const [activeFont, setActiveFont] = useState<HTMLElement | null>(null) 
    const styleRef = useRef(null);


    function getComputedStyle(refrence : MutableRefObject<HTMLElement | null> ){
        var test : JSX.Element[] = [];
        var fontFamilies : string[] = []
        if(computedStylesArray.length == 0) {
          if(refrence.current!=null){
              setComputedStyles(computedStylesArray);
          }
        }
        fontFamilies = computedStylesArray.split(",")
        for (let index = 0; index < fontFamilies.length; index++) {
            var selected = false;

            if(sentProps.currentValue == fontFamilies[index].trim())
                selected = true;

        
            test.push(<option key={index} onClick={setLanguage(computedStylesArray, fontFamilies[index])} selected={selected}>{fontFamilies[index]}</option>)
        }
    
        return test;
    }

    function getStylesSelect (refrence : MutableRefObject<HTMLElement | null> ){
        var select : JSX.Element;
        select = <select {...sentProps.register("activeFont"+sentProps.btnName)}>{getComputedStyle(refrence)}</select>
        
        return select;
      }

      function setLanguage(fontfamily : string, value : string){
        return function setLanguageEvent(e: any){
            const regex = RegExp(",*."+value, "i")
            document.documentElement.style.setProperty(sentProps.cssVariable, value  + ", "  + fontfamily.replace(regex, ""));
            e.target.className="active-font"
            if(activeFont!=null)
              activeFont.className=""
            setActiveFont(e.target)
            console.log(e.target)
        }
    
    }
    


  return (
    <label ref={styleRef}>
        {getStylesSelect(styleRef)}
    </label>
  )
}

export default FontDropDownSelect