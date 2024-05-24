import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks'
import { getAllWeddings, selectWeddings } from '../../redux/slices/weddingsSlice'
import './weddingsmenu.sass'
import CreateWeddingForm from '../../components/forms/create-wedding-form'
import Weddinglist from '../../components/lists/weddinglist'
import WeddingUpdate from '../../components/forms/weddingUpdate'

function Weddingsmenu() {
    const dispatch = useAppDispatch()


    useEffect(()=> {
        dispatch(getAllWeddings())
    }, [])
    
    




    return (
        <div>
            <h1>Weddingsmenu</h1>
            <Weddinglist></Weddinglist>
            <CreateWeddingForm></CreateWeddingForm>
            <WeddingUpdate></WeddingUpdate>
        </div>

    )
}

export default Weddingsmenu