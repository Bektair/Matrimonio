import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { IMenuOptionCreate } from '../../API/CreateReception';
import './createMenuItemForm.sass'
import { Allergen } from '../../constants/allergens';

interface IProps {
    menuItemAdd : any
}


function CreateMenuItemForm(props : IProps) {
    const { register, handleSubmit } = useForm();
    const [image, setImage] = useState("")
    const allergenOptions = Object.values(Allergen)


    function menuItemFormHandler(formdata: any){
        console.log(formdata)
        var menuItem : IMenuOptionCreate = {
            alergens: formdata.allergens,
            dishName: formdata.dishname,
            image: formdata.image,
            tags: formdata.tags
        } 

        props.menuItemAdd(menuItem);
    }

    function renderImage(e : any){
        setImage(e.target.value)
    }

    function getAllergenOptions(){
        var allergens : JSX.Element[] = [];

        allergenOptions.forEach(allergenOption => {
            allergenOption.toString()
            allergens.push(<label>{allergenOption}<input {...register('allergen_chk')} type='checkbox' name='allergen_chk' value={allergenOption}/></label>)
        });
        return allergens;
    }

    //Can I add the menu from the RSVP, that kind of items here as a display?
    //First add alergens and stuff
  return (
    
    <div>createMenuItemForm
        <form id='menuOptionForm' onSubmit={handleSubmit(menuItemFormHandler)}>
            <input {...register("dishname")} type='text' placeholder='dishname'/>
            <label id='menuOptionForm-allergen'>Allergens: {getAllergenOptions()}</label>
            <label>Tags</label>
            <select {...register("tags")}>

            </select>
            <input {...register("image")} type='text' onInput={renderImage} placeholder='image'/>
            <button type='submit'>AddDishToReception</button>
        </form>
        
        { image.length > 0 && <img id='menu-icon-display' src={image}></img>}
    </div>
  )
}

export default CreateMenuItemForm