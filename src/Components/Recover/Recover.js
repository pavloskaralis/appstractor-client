import React, { useState } from 'react'
import Request from './Request/Request'
import Reset from './Reset/Reset'
import {useLocation} from 'react-router-dom'


export default function Recover(){
    const location = useLocation();
    const [code, setCode] = useState(location.search.match(/(?<=Code=)[\w_-]+(?=&)/) ? location.search.match(/(?<=Code=)[\w_-]+(?=&)/)[0] : null);

    
    return (
        <>
        {code ?
            <Reset code={code} resetCode={()=> setCode(null)}/> :
            <Request/>
        }
        </>
    )
}