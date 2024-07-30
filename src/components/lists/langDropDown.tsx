import { useEffect, useState } from 'react';
import './langDropDown.sass'
import '../../_index.sass'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { setLangState } from '../../redux/slices/langSlice';
import { getAllPostsInWedding, getAWedding, getCeremony, getParticipantsThunk, getReception, getRSVPbyWedding, resetWedding, setWedding } from '../../redux/slices/weddingSlice';
import { selectCeremony, selectParticipants, selectPosts, selectReception, selectRSVPS, selectWedding } from '../../redux/selectors/selectWeddingSlice';
import { selectLanguage } from '../../redux/selectors/selectLanguage';

interface IProps{
    defaultOptionIndex: number 
    style: string
    options: Option[]
}

export interface Option{
    selectedOptionName : string
    selectedOptionImg : string
}

const LangDropDown = (o : IProps) => {

    const dispatch = useAppDispatch();
    const wedding = useAppSelector(selectWedding);
    const ceremony = useAppSelector(selectCeremony);
    const reception = useAppSelector(selectReception);
    const participants = useAppSelector(selectParticipants);
    const rsvps = useAppSelector(selectRSVPS);
    const posts = useAppSelector(selectPosts);




    useEffect(()=>{
    }, [])

const [selectedOption, setSelectedOption] = useState(o.defaultOptionIndex);
const [display, setDisplay] = useState('none');
    function handleClick() {
        setDisplay(display === 'none' ? 'grid' : 'none');
        console.log("AllOptions:")
        console.log(o.options)
    }
    const handleOptionClick = (option : any) => {
        console.log("CLICKED:")
        console.log(option)
        console.log(option.target.id)
        var selection = option.currentTarget.id.split("-")[0];
        console.log(selection);
        console.log(option.target.lang);
        setDisplay(display === 'none' ? 'block' : 'none');
        setSelectedOption(selection);
        dispatch(setLangState({language: option.target.lang}))
        if(wedding){
            dispatch(getAWedding({weddingId: wedding?.id.toString(), language: option.target.lang}))
            console.log("TRIGGERS _--------------------------------_ GettingWedding again")
            if(ceremony)
                dispatch(getCeremony({weddingId: wedding?.id.toString(), language: option.target.lang}))
            if(reception)
                dispatch(getReception({weddingId: wedding?.id.toString(), language: option.target.lang}))            
            if(participants)
                dispatch(getParticipantsThunk({weddingId: wedding?.id.toString(), language: option.target.lang}))                        
            if(rsvps)
                dispatch(getRSVPbyWedding({weddingId: wedding?.id.toString(), language: option.target.lang}))                        
            if(posts)
                dispatch(getAllPostsInWedding({weddingId: wedding?.id.toString(), language: option.target.lang}))                        
        
        }
        //dispatch(resetWedding())
    }

  return (
    <div className='dropdown'>
        <button className='dropdown-btn' onClick={handleClick}>
            <img
                className={o.style}
                src={o.options[selectedOption].selectedOptionImg} 
                alt={o.options[selectedOption].selectedOptionName}
                lang={o.options[selectedOption].selectedOptionName}
            />   
        </button>
        <ul className='dropdown-options language-picture' style={{display}}>
            {o.options.map((option, index) => (
                <li 
                    key={option.selectedOptionName}
                    onClick={(option)=>{handleOptionClick(option)}}
                    className='dropdown-option'    
                    id={index.toString()+"-dropDownItem-"+option.selectedOptionName}
                >
                    <img 
                        className={o.style}
                        src={option.selectedOptionImg} 
                        alt={option.selectedOptionName}
                        lang={option.selectedOptionName}
                    />  
                </li>
            ))
            }
        </ul>
    </div>
  )
}

export default LangDropDown