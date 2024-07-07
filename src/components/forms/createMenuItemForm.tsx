import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { IMenuOptionCreate } from '../../API/CreateReception';
import './createMenuItemForm.sass'
import { Allergen } from '../../constants/allergens';
import Select from 'react-select';
import { DishTags } from '../../constants/dishtags';

interface IProps {
    menuItemAdd : any
    
}

export interface SelectValue{
    value: string
    label: string
}

function CreateMenuItemForm(props : IProps) {
    const { register, handleSubmit } = useForm();
    const [image, setImage] = useState("")
    const allergenOptions = Object.values(Allergen).map((s)=> {return {value: s, label: s.toString()}})
    const dishTagOptions = Object.values(DishTags).map((s)=> {return {value: s, label: s.toString()}})
    const [allergens, setAllergens] = useState<SelectValue[]>([]);
    const [tags, setTags] = useState<SelectValue[]>([]);



    function menuItemFormHandler(formdata: any){
        console.log(formdata)

        var allergensString = allergens.map((x)=>x.value).toString();
        var tagsString = tags.map((x)=>x.value.toString()).toString();
        

        var menuItem : IMenuOptionCreate = {
            dishName: formdata.dishname,
            image: formdata.image,
            alergens: allergensString,
            tags: tagsString
        } 

        props.menuItemAdd(menuItem);
    }

    function renderImage(e : any){
        setImage(e.target.value)
    }

    function setAllergensOnChange(e: any){
        console.log(e)
        setAllergens(e)

    }

    function setTagsOnChange(e: any){
        console.log(e)
        setTags(e)
    }

    // function getAllergenOptions(){
    //     var allergens : JSX.Element[] = [];

    //     allergenOptions.forEach(allergenOption => {
    //         allergenOption.toString()
    //         allergens.push(<label>{allergenOption}<input {...register('allergen_chk')} type='checkbox' name='allergen_chk' value={allergenOption}/></label>)
    //     });
    //     return allergens;
    // }

    //Can I add the menu from the RSVP, that kind of items here as a display?
    //First add alergens and stuff
  return (
    
    <div>createMenuItemForm
        <form id='menuOptionForm' onSubmit={handleSubmit(menuItemFormHandler)}>
            <label>DishName:</label>
            <input {...register("dishname")} type='text' placeholder='dishname'/>
            <label className='multi-select-menuOption'>Allergens:</label>
            <Select
                isMulti
                name="allergens"
                options={allergenOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={setAllergensOnChange}
                placeholder='Select Allergens'
            />
            <label className='multi-select-menuOption'>Tags:</label>
            <Select 
                isMulti
                name="dish-tags"
                options={dishTagOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={setTagsOnChange}
                placeholder='Select Tags'
            />
            <label>Image:</label>
            <input {...register("image")} type='text' onInput={renderImage} placeholder='image'/>
            <button type='submit'>AddDishToReception</button>
        </form>
        
        { image.length > 0 && <img id='menu-icon-display' src={image}></img>}
    </div>
  )
}

export default CreateMenuItemForm