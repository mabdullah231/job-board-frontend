import React from "react";
import Select from "react-select"; // Import react-select

const ListingSelect = ({ label, name, value, onChange, options, placeholder }) => {
    const handleChange = (selectedItem) => {
        console.log(`Select changed: ${name} = ${selectedItem ? selectedItem.value : ''}`); // Debugging
        onChange(selectedItem); // Pass the selected item to the parent
    };
    const styleProxy = new Proxy({}, {
        get: (target, propKey) => () => {}
    });

    return (
        <div className="single_field mb-4">
            {/* {label && <label htmlFor={name}>{label}</label>} Render label if provided */}
            <Select
                id={name} // Use id for accessibility
                name={name}
                value={options.find(option => option.value === value)} // Set the selected value
                onChange={handleChange} // Handle change event
                options={options} // Options for the select
                placeholder={placeholder} // Placeholder text
                // styles={styleProxy}
                />
        </div>
    );
};

export default ListingSelect;