import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { IMenuOptionCreate } from '../../API/CreateReception';
import { DishTags } from '../../constants/dishtags';
import { useAppSelector } from '../../redux/Hooks/hooks';
import { selectLanguage } from '../../redux/selectors/selectLanguage';
import './createMenuItemForm.sass';

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
    const dishTagOptions = Object.values(DishTags).map((s)=> {return {value: s, label: s.toString()}})
    const [tags, setTags] = useState<SelectValue[]>([]);
    const language = useAppSelector(selectLanguage).language;


    function menuItemFormHandler(formdata: any){
        console.log(formdata)

        var tagsString = tags.map((x)=>x.value.toString()).toString();
        

        var menuItem : IMenuOptionCreate = {
            DishType: formdata.dishname,
            Image: formdata.image,
            Tags: tagsString,
            IsDefaultLanguage: true,
            Language: language
        } 

        props.menuItemAdd(menuItem);
    }

    function renderImage(e : any){
        setImage(e.target.value)
    }

    function setTagsOnChange(e: any){
        console.log(e)
        setTags(e)
    }


    //Can I add the menu from the RSVP, that kind of items here as a display?
    //First add alergens and stuff
  return (
    
    <div>createMenuItemForm
        <form id='menuOptionForm' onSubmit={handleSubmit(menuItemFormHandler)}>
            <label>DishName:</label>
            <input {...register("dishname")} type='text' placeholder='dishname'/>
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