import React from "react";
import axios from "../../Api/Axios";
function LineTypeAhead() {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState();
  const handleSearch = async (e) => {
    try {
      let { data } = await axios.get(`config/line?query=${e}`);
      setOptions(data);
    } catch (error) {}
  };
  return (
    <div>
      <AsyncTypeahead
        id="basic-example"
        labelKey={(option) => `${option.name}`}
        onChange={(e) => {
          setSelected(e);
          setSection(e);
        }}
        onSearch={handleSearch}
        options={options}
        placeholder="Search Sections..."
        selected={selected}
      />
    </div>
  );
}

export default LineTypeAhead;
