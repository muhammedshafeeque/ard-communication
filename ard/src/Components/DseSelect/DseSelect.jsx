import React, { useEffect, useState } from 'react'
import { FormSelect } from 'react-bootstrap'
import axios  from '../../Api/Axios'
import { Stor } from '../../Context/Store'
import { useAlert } from 'react-alert'
function DseSelect({control}) {
    const {setBlockUi}=Stor()
    const alert=useAlert()
    const [dses,setDses]=useState([])
    useEffect(()=>{
        setBlockUi(true)
        axios.get('config/dse').then((res)=>{
            setDses(res.data)
            setBlockUi(false)
        }).catch((err)=>{
            setBlockUi(false)
            alert.error(err.response.data.message)
        })
    },[setBlockUi,setDses,alert])
  return (
    <div>
        <label htmlFor="">DSE</label> 
        <FormSelect {... control.register('dse')}>
            
            <option >Select</option>
            {dses.map((item)=>{
                return <option key={item._id} value={item._id}>{item.mobile}</option>
            })}
        </FormSelect>
    </div>
  )
}

export default DseSelect