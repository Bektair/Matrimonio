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
    const { register, handleSubmit, reset  } = useForm();
    const [allergens, setAllergens] = useState<SelectValue[]>([]);
    const dispatch = useAppDispatch();



    function setAllergensOnChange(e: any){
        console.log(e)
        setAllergens(e)

    }

    function menuOrderFormHandler(formdata: any){
        console.log(formdata)

        var allergensString = allergens.map((x)=> "," + x.value).toString();
        console.log(formdata.otherAllergens)
        var otherAllergens = formdata.otherAllergens ? formdata.otherAllergens : "" ;
        
        console.log("ALLERGENS COMING UP!_____________________-")
        console.log(otherAllergens)

        if(otherAllergens == "" || otherAllergens.trim().startsWith(",")){
          allergensString = allergensString.substring(1); //Remove initial ,
        }

        console.log(allergensString)

        var menuItem : IMenuOrderCreate = {
            alergens: (otherAllergens + allergensString).replace(",,", ","),
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
        setAllergens([]);
        reset();
        console.log("");
    }

  return (
    <>
    <h3>MenuOrder</h3>
    <form className='createMenuOrder' id='createMenuOrder' onSubmit={handleSubmit(menuOrderFormHandler)}>
      <label className='menuOrderItem' >
        <p>Name:</p>
        <input {...register('name')} type="text" placeholder="Name"></input>  
      </label>
      <label className='menuOrderItem allergens'>
            <p>Allergens:</p>
            <Select
                isMulti
                isClearable
                name="allergens"
                value={allergens}
                options={allergenOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={setAllergensOnChange}
                placeholder='Select Allergens'
            />
            <input {...register('otherAllergens')} type='text' placeholder='other Allergens'></input>
      </label>
      <button type='submit' className='addMenuOrder'>AddOrder</button>
    </form>
    </>
  )
}

export default CreateMenuOrderForm