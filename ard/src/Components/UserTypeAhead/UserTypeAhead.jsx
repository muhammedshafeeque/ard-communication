import React, { useState } from "react";
import axios from "../../Api/Axios";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { Controller } from "react-hook-form";
function UserTypeAhead({ control, rules }) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState();
  const handleSearch = async (e) => {
    try {
      let { data } = await axios.get(`user/users?query=${e}`);
      setOptions(data);
    } catch (error) {}
  };
  return (
    <div>
      <label htmlFor="">Name</label>
      <Controller
        name="user"
        control={control}
        rules={rules}
        defaultValue={null}
        render={({ field }) => (
          <AsyncTypeahead
            {...field}
            id="basic-example"
            labelKey={(option) => `${option.name}`}
            onSearch={handleSearch}
            options={options}
            placeholder="Search Users..."
            selected={selected}
            onChange={(selected) => {
              field.onChange(selected[0]); // Handle single object selection
              // onSelectionChange(selected[0]); // Pass the selected object back to the parent component
            }}
          />
        )}
      />
    </div>
  );
}

export default UserTypeAhead;
