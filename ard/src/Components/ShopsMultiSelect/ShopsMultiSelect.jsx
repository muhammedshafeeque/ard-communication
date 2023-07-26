import React, { useEffect, useState } from "react";
import axios from "../../Api/Axios";
import { Stor } from "../../Context/Store";
import { useAlert } from "react-alert";
import Select from 'react-select'
import { Controller } from "react-hook-form";
function ShopsMultiSelect({ control, rules }) {
  const { setBlockUi } = Stor();
  const alert = useAlert();
  const [options,setOptins]=useState([])

  useEffect(() => {
    setBlockUi(true);
    axios
      .get("config/shop?limit=1000")
      .then(({ data }) => {
        setBlockUi(false);
        let arr=[]
        data.forEach((item)=>{
            arr.push({value:item._id,label:item.name})
            
        })
        setOptins(arr)
      })
      .catch((err) => {
        setBlockUi(false);
        alert.error(err.response.data.message);
      });
  }, [setBlockUi,alert]);

  return (
    <div>
      <label>Shops</label>
      <Controller 
      name="shops"
      control={control}
      rules={rules}
      defaultValue={null}
      render={({ field }) => (
        <Select  {...field} options={options} isMulti />
      )}
      />
      
    </div>
    
  );
}

export default ShopsMultiSelect;
