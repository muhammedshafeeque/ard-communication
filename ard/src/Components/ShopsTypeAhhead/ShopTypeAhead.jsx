import React, { useState } from "react";
import axios from "../../Api/Axios";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { Controller } from "react-hook-form";

function ShopTypeAhead({ control, rules, config, name }) {
  const [options, setOptions] = useState([]);

  const handleSearch = async (e) => {
    try {
      let { data } = await axios.get(`config/shop?query=${e}`);
      setOptions(data);
    } catch (error) {
      console.error("Error fetching shop data:", error);
      setOptions([]); // Set options to an empty array on error to clear the dropdown.
    }
  };

  return (
    <div>
      <Controller
        name={`${config && config.array ? name : "shop"}`}
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
            placeholder="Search Shop..."
            onChange={(selected) => {
              field.onChange(selected[0]);
            }}
          />
        )}
      />
    </div>
  );
}

export default ShopTypeAhead;
