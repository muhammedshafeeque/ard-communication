import React, { useState } from "react";
import axios from "../../Api/Axios";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { Controller } from "react-hook-form";
function LineTypeAhead({ control, rules }) {
  const [options, setOptions] = useState([]);
  const handleSearch = async (e) => {
    try {
      let { data } = await axios.get(`config/line?query=${e}`);
      setOptions(data);
    } catch (error) {}
  };
  return (
    <div>
      <label htmlFor="">Line</label>
      <Controller
        name="line"
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
            placeholder="Search Lines..."
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

export default LineTypeAhead;
