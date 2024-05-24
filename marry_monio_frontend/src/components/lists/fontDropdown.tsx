import {
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useMergeRefs
} from "@floating-ui/react";
import { MutableRefObject, useState } from "react";
import { createPortal } from "react-dom";
import './fontdropdown.sass'


interface sentProps{
  cssVariable: string
  btnName: string
}


export default function FontDropdown(sentProps : sentProps) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFont, setActiveFont] = useState<HTMLElement | null>(null) 
  const [computedStylesArray, setComputedStyles] = useState("");


  const {
    refs: tooltipRefs,
    floatingStyles: tooltipFloatingStyles,
    context: tooltipContext
  } = useFloating({
    placement: "top",
    open: tooltipOpen,
    onOpenChange: setTooltipOpen
  });

  const {
    refs: menuRefs,
    floatingStyles: menuFloatingStyles,
    context: menuContext
  } = useFloating({
    open: menuOpen,
    onOpenChange: setMenuOpen
  });

  const {
    getReferenceProps: getTooltipReferenceProps,
    getFloatingProps: getTooltipFloatingProps
  } = useInteractions([useHover(tooltipContext), useDismiss(tooltipContext)]);

  const {
    getReferenceProps: getMenuReferenceProps,
    getFloatingProps: getMenuFloatingProps
  } = useInteractions([useClick(menuContext), useDismiss(menuContext)]);

  const ref = useMergeRefs([tooltipRefs.setReference, menuRefs.setReference]);
  const props = getTooltipReferenceProps(getMenuReferenceProps());

function getComputedStyle(refrence : MutableRefObject<HTMLElement | null> ){
    var test : JSX.Element[] = [];
    var fontFamilies : string[] = []
    console.log(computedStylesArray)
    if(computedStylesArray.length == 0) {
      if(refrence.current!=null){
          var fontfamily = "";
          var computed = window.getComputedStyle(refrence.current)
          fontfamily = computed.fontFamily
          setComputedStyles(fontfamily);
      }
    }
    fontFamilies = computedStylesArray.split(",")
    for (let index = 0; index < fontFamilies.length; index++) {
        test.push(<div key={index} onClick={setLanguage(computedStylesArray, fontFamilies[index])}>{fontFamilies[index]}</div>)
    }

    return test;
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
    <>
      <button className="font-dropdown-btn" ref={ref} {...props}>
        {sentProps.btnName}
      </button>
      {tooltipOpen && (
        <div
          ref={tooltipRefs.setFloating}
          style={{
            ...tooltipFloatingStyles,
            background: "black",
            color: "white",
            padding: 10
          }}
          {...getTooltipFloatingProps()}
        >
          ClickToChooseLanguage
        </div>
      )}
      {menuOpen && createPortal (
        <div
          id="font-family-menu"
          ref={menuRefs.setFloating}
          style={{
            ...menuFloatingStyles,
          }}
          {...getMenuFloatingProps()}
        >
            {menuRefs.floating && getComputedStyle(menuRefs.floating)}    
        </div>, document.body
      )}
    </>
  );
}