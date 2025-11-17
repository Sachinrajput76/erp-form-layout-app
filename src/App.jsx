import CommonHeader from "./components/CommonHeader/CommonHeader";
import { searchDetailsForm, formKey } from "./forms/salesReturnForms";
import './App.css';

export default function App() {
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
      />
    </div>
  );
}
