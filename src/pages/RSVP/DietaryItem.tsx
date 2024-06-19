import '../../_index.sass'
import './DietaryItem.sass'

interface IDietaryItem {
    image : string
    name : string
    allergens: string[]
    tags: string[]
    id: number
    selected: boolean
}



function DietaryItem(item : IDietaryItem) {
const IsDinner = item.tags.find((tag) => tag.match("Dinner"));
const IsDessert = item.tags.find((tag) => tag.match("Dessert"));
const selectedItem = !item.selected ? "" : IsDinner ? "selected-dish-item":"selected-dessert-item";


function setAllergens(){
    var alergensCsv = ""
    for(let i = 0; i<item.allergens.length; i++){
        alergensCsv+=item.allergens[i]+","
    }
    var element = <div  key={`allergens`}>{alergensCsv.substring(0, alergensCsv.length-1)}</div>
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

function dinnerRadioSelected(event : any){
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

function dessertRadioSelected(event : any){
    console.log(event.target.value);
    
    console.log(event.target.parentElement)
    var parent = event.target.parentElement;
    var allDishItems = document.getElementsByClassName("dietary-item");
    for(let i = 0; i < allDishItems.length; i++){
        console.log(allDishItems[i])
        allDishItems[i].classList.remove('selected-dessert-item')
    }
    parent.classList.add('selected-dessert-item')
}




return (


    <label className={`dietary-item ${selectedItem}`}  id={item.id.toString()} key={item.id.toString()+"-"+item.name}> 
        <img src={item.image}></img>
        <div>{item.name}</div>
        { IsDinner &&
        <input type="radio" name="isSelectedDinner" onChange={dinnerRadioSelected} defaultChecked={item.selected}></input>}
        { IsDessert &&
        <input type="radio" name="isSelectedDessert"  onChange={dessertRadioSelected} defaultChecked={item.selected}></input>}
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