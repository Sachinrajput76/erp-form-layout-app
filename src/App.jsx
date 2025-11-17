import CommonHeader from "./components/CommonHeader/CommonHeader";
import { searchDetailsForm, formKey } from "./forms/salesReturnForms";
import './App.css';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function App() {
  const form = useSelector(
    (state) => state.globalData.formData[formKey]?.Header
  );

  // Correct initial state based on window width
  const [isGrid, setIsGrid] = useState(window.innerWidth > 768);

  // Listen to window resize
  useEffect(() => {
    const handleResize = () => {
      setIsGrid(window.innerWidth > 768); // true if width > 768, else false
    };

    window.addEventListener("resize", handleResize);

    // Run once to ensure correct class on mount
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Determine the field order based on isGrid
  const sortedFields = isGrid
    ? searchDetailsForm // keep original order on desktop
    : [
      ...searchDetailsForm.filter(f => f.type !== 'button'), // non-buttons first
      ...searchDetailsForm.filter(f => f.type === 'button')  // buttons last on mobile
    ];


  console.log("Current Form Data:", form, "Is Grid:", isGrid);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Sales Return Form Demo</h1>
      <div className={!isGrid ? "form-grid" : ""}>
        <CommonHeader
          title="Search Details"
          path="Header"
          formKey={formKey}
          fieldConfig={!isGrid ? sortedFields : searchDetailsForm}
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
