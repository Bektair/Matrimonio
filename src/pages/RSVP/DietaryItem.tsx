import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import './DietaryItem.sass'
import '../../_index.sass'

interface IDietaryItem {
    image : string
    name : string
    allergens: string[]
    tags: string[]
}



function DietaryItem(item : IDietaryItem) {



function setAllergens(){
    var alergensCsv = ""
    for(let i = 0; i<item.allergens.length; i++){
        alergensCsv+=item.tags[i]+","
    }
    var element = <div  key={`tags`}>{alergensCsv.substring(0, alergensCsv.length-1)}</div>
    return element
}

function setTags(){
    
    var tagsCsv = ""
    for(let i = 0; i<item.tags.length; i++){
        tagsCsv+=item.tags[i]+","
    }
    
    var element = <div  key={`tags`}>{tagsCsv.substring(0, tagsCsv.length-1)}</div>
    return element
}

function radioIsSelected(event : any){
    console.log(event.target.value);
    
    console.log(event.target.parentElement)
    var parent = event.target.parentElement;
    var allDishItems = document.getElementsByClassName("dietary-item");
    for(let i = 0; i < allDishItems.length; i++){
        console.log(allDishItems[i])
        allDishItems[i].classList.remove('selected-dish-item')
    }
    parent.classList.add('selected-dish-item')
}


return (
    <label className="dietary-item"> 
        <img src={item.image}></img>
        <div>{item.name}</div>
        <input type="radio" name="isSelected" onChange={radioIsSelected}></input>
        <div>
            <div>Alergens:</div>
            {
               setAllergens()
            }
        </div>
        <div>
            <div>Tags:</div>

            {
                setTags()
            }
        </div>
    </label>
  )
}

export default DietaryItem