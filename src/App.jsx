import CommonHeader from "./components/CommonHeader/CommonHeader";
import './App.css';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { searchDetailsForm, formKey } from "./forms/salesReturnForms";

export default function App() {
  const form = useSelector(
    (state) => state.globalData.formData[formKey]?.Header
  );

  // Correct initial state based on window width
  const [isGrid, setIsGrid] = useState(window.innerWidth > 768);

  // Make the form configuration stateful so it can be updated
  const [formFields, setFormFields] = useState(searchDetailsForm);

  // Function to dynamically add new options to a specific dropdown
  const addDropdownOptions = (fieldName, newOptions) => {
    setFormFields(currentFields =>
      currentFields.map(field => {
        // Check if the current field is the target dropdown
        if (field.name === fieldName && field.type === 'dropdown') {
          // Return a new field object with the updated options array
          return { ...field, options: [...field.options, ...newOptions] };
        }
        // Return other fields unchanged
        return field;
      })
    );
  };

  // Listen to window resize
  useEffect(() => {
    const handleResize = () => {
      setIsGrid(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    // Run once to ensure correct class on mount
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine the field order based on isGrid, now using the stateful 'formFields'
  const sortedFields = isGrid
    ? formFields
    : [
      ...formFields.filter(f => f.type !== 'button'),
      ...formFields.filter(f => f.type === 'button')
    ];

  console.log("Current Form Data:", form, "Is Grid:", isGrid);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Sales Return Form Demo</h1>

      {/* Buttons to trigger the dynamic updates */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => {
            const newItems = [
              { value: "new item1", label: "new Item 1", itemCode: "S111" },
              { value: "new item2", label: "new Item 2", itemCode: "S112" },
              { value: "new item3", label: "new Item 3", itemCode: "S113" }
            ];
            addDropdownOptions("Item Name", newItems);
          }}
          style={{ marginRight: '10px' }} // Added some spacing
        >
          Add New Items to Dropdown
        </button>

        {/* --- NEW BUTTON FOR PARTY NAME --- */}
        <button
          onClick={() => {
            const newParties = [
              { value: "new party1", label: "new Party 1", shortCode: "P111" },
              { value: "new party2", label: "new Party 2", shortCode: "P112" },
              { value: "new party3", label: "new Party 3", shortCode: "P113" }
            ];
            addDropdownOptions("Party Name", newParties);
          }}
        >
          Add New Parties to Dropdown
        </button>
      </div>

      <div className={!isGrid ? "form-grid" : ""}>
        <CommonHeader
          title="Search Details"
          path="Header"
          formKey={formKey}
          // Use the stateful form configuration here
          fieldConfig={!isGrid ? sortedFields : formFields}
          classesObj={{}}
          onFieldChange={(name, value) => {
            console.log("Field Changed →", name, value);
          }}
          onButtonClick={(btnName, formData) => {
            console.log("Button clicked →", btnName, formData);
          }}
        />
      </div>
    </div>
  );
}