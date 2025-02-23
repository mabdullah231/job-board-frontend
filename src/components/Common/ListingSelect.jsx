import React from "react";
import Select from "react-select";

const ListingSelect = ({ label, name, value, onChange, options, placeholder }) => {
  const handleChange = (selectedItem) => {
    console.log(`Select changed: ${name} = ${selectedItem ? selectedItem.value : ''}`); // Debugging
    onChange(selectedItem); // Pass the selected item to the parent
  };

  return (
    <div className="single_field mb-4">
      {/* Render label if provided */}
      {/* {label && <label htmlFor={name}>{label}</label>} */}
      <Select
        id={name} // Use id for accessibility
        name={name}
        value={value ? options.find(option => option.value === value) : null} // Set the selected value
        onChange={handleChange} // Handle change event
        options={options} // Options for the select
        placeholder={placeholder} // Placeholder text
        isClearable // Allow clearing the selection
      />
    </div>
  );
};

export default ListingSelect;