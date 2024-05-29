import React, { useState } from 'react';
import { X, Plus } from 'react-feather';

const CardAdd = (props) => {

    const [card,setCard] = useState('');
    const [show,setShow] = useState(false);

    const saveCard = ()=>{
        if(!card){
            return;
        }
        props.getcard(card);
        setCard('');
        setShow(!show);
    }

    const closeBtn = ()=>{
        setCard('')
        setShow(!show)
    }


    
    return (
        <div>
            <div className="flex flex-col bg-transparent">
            {show && <div>
                <textarea value={card} onChange={(e)=>setCard(e.target.value)} className='p-1 w-full rounded-md border-2 bg-[#fffed6] border-zinc-900' name="" id="" cols="30" rows="2" placeholder='Enter Card Title...'></textarea>
                <div className='flex p-1'>
                    <button onClick={()=>saveCard()} className='p-1 rounded bg-amber-200 mr-2 '>Add Card</button>
                    <button onClick={()=> closeBtn()} className='p-1 rounded hover:bg-lime-100'><X size={16}></X></button>
                </div>
            </div>}
            {!show && <button onClick={()=> setShow(!show)} className='flex p-1 w-full justify-start rounded items-center mt-1 bg-[#fff] hover:bg-orange-200 h-8'>
                <Plus size={16}></Plus> Add a task
            </button>}
            </div>
        </div>
    );
}

export default CardAdd;