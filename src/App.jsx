import CommonHeader from "./components/CommonHeader/CommonHeader";
import { searchDetailsForm, formKey } from "./forms/salesReturnForms";
import './App.css';
import { useSelector } from "react-redux";

export default function App() {
  const form = useSelector(
    (state) => state.globalData.formData[formKey]?.Header
  );

  console.log("Current Form Data:", form);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Sales Return Form Demo</h1>

      <CommonHeader
        title="Search Details"
        path="Header"
        formKey={formKey}
        fieldConfig={searchDetailsForm}
        classesObj={{}}
        onFieldChange={(name, value) => {
          console.log("Field Changed →", name, value);
        }}
        onButtonClick={(btnName, formData) => {
          console.log("Button clicked →", btnName, formData);
        }}
      />
    </div>
  );
}
