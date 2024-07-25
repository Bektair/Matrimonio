import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { IMenuOrderCreate, IMenuOrderCreateRSVP } from '../../API/CreateRSVP';
import { Allergen } from '../../constants/allergens';
import { useAppDispatch } from '../../redux/Hooks/hooks';
import { addMenuOrderOption } from '../../redux/slices/weddingSlice';
import { SelectValue } from './createMenuItemForm';
import './createMenuOrderForm.sass'

interface IProps {
  menuOptionId: string
  rsvp_id: string
}

function CreateMenuOrderForm(props: IProps) {
    const allergenOptions = Object.values(Allergen).map((s)=> {return {value: s, label: s.toString()}})
    const { register, handleSubmit } = useForm();
    const [allergens, setAllergens] = useState<SelectValue[]>([]);
    const dispatch = useAppDispatch();



    function setAllergensOnChange(e: any){
        console.log(e)
        setAllergens(e)

    }

    function menuOrderFormHandler(formdata: any){
        console.log(formdata)

        var allergensString = allergens.map((x)=> "," + x.value).toString();
        var otherAllergens = formdata.OtherAllergens ? formdata.OtherAllergens : "" ;
        if(otherAllergens = ""){
          allergensString = allergensString.substring(1); //Remove initial ,
        }

        var menuItem : IMenuOrderCreate = {
            alergens: otherAllergens + allergensString,
            name: formdata.name,
            menuOptionId: Number(props.menuOptionId)
        } 

        var menuOrderCreate:  IMenuOrderCreateRSVP = {
          RSVP_id : props.rsvp_id.toString(),
          MenuOrders : menuItem
        }

        console.log("MenuOrderCreate IS READY!")
        console.log(menuOrderCreate)

        dispatch(addMenuOrderOption(menuOrderCreate))
    }

  return (
    <>
    <h3>MenuOrder</h3>
    <form className='createMenuOrder' onSubmit={handleSubmit(menuOrderFormHandler)}>
      <label className='menuOrderItem' >
        Name:
        <input {...register('name')} type="text" placeholder="Name"></input>  
      </label>
      <label className='menuOrderItem allergens'>
            <Select
                isMulti
                name="allergens"
                options={allergenOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={setAllergensOnChange}
                placeholder='Select Allergens'
            />
            <input {...register('otherAllergens')} type='text' placeholder='other Allergens'></input>
      </label>
      <button type='submit' className='addMenuOrder'>AddMenuOrder</button>
    </form>
    </>
  )
}

export default CreateMenuOrderForm