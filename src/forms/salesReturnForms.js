const formKey = "SalesReturnFormData";

const searchDetailsForm = [
    // 🔽 DROPDOWNS
    {
        type: "dropdown",
        name: "Item Name",
        path: "Header.ItemName",
        label: "Item Name",
        required: true,
        options: [
            { value: "item1", label: "Item 1", shortCode: "S101" },
            { value: "item2", label: "Item 2", shortCode: "S102" },
            { value: "item3", label: "Item 3", shortCode: "S103" }
        ],
        dropdownProps: {
            shortCode: "shortCode",  // Field name in the option object
            showShortCode: true,
            position: "1" // 1 means after the value, 0 means before the value
        }
    },
    {
        type: "dropdown",
        name: "Party Name",
        path: "Header.PartyName",
        label: "Party Name",
        required: true,
        options: [
            { value: "party1", label: "Party 1", shortCode: "P101" },
            { value: "party2", label: "Party 2", shortCode: "P102" },
            { value: "party3", label: "Party 3", shortCode: "P103" }
        ],
        dropdownProps: {
            shortCode: "shortCode",
            showShortCode: true,
            position: 1
        }
    },

    // 🔽 DATE INPUTS
    {
        type: "input",
        inputType: "date",
        name: "From Date",
        path: "Header.FromDate",
        label: "From Date",
    },
    {
        type: "button",
        name: "button 1",
        label: "button 1",
        className: "btn-secondary",
        onClick: (formData) => {
            console.log("button 1 clicked:", formData);
        },
    },
    {
        type: "input",
        inputType: "date",
        name: "To Date",
        path: "Header.ToDate",
        label: "To Date",
    },

    // 🔽 TEXT INPUT (NORMAL)
    {
        type: "input",
        inputType: "text",
        name: "Invoice No",
        path: "Header.InvoiceNo",
        label: "Invoice Number",
        placeholder: "Enter invoice no",
    },


    // 🔽 NUMBER INPUT
    {
        type: "input",
        inputType: "number",
        name: "Quantity",
        path: "Header.Quantity",
        label: "Quantity",
        required: true,
    },
    {
        type: "button",
        name: "button 2",
        label: "button 2",
        className: "btn-secondary",
        onClick: (formData) => {
            console.log("button 2 clicked:", formData);
        },
    },
    // 🔽 CHECKBOX
    {
        type: "checkbox",
        name: "IsReturned",
        path: "Header.IsReturned",
        label: "Is Returned?",
    },

    // 🔽 RADIO BUTTONS
    {
        type: "radio",
        name: "ReturnType",
        path: "Header.ReturnType",
        label: "",
        required: true,
        options: [
            { value: "full", label: "Full Return" },
        ],
    },
    {
        type: "radio",
        name: "ReturnType",
        path: "Header.ReturnType",
        label: "",
        required: true,
        options: [
            { value: "partial", label: "Partial Return" },
        ],
    },

    // 🔽 TEXTAREA
    {
        type: "button",
        name: "button 3",
        label: "button 3",
        className: "btn-secondary",
        onClick: (formData) => {
            console.log("button 3 clicked:", formData);
        },
    },
    // 🔽 BUTTONS
    {
        type: "button",
        name: "SearchBtn",
        label: "Search",
        className: "btn-primary",
        onClick: (formData) => {
            console.log("Search clicked:", formData);
        },
    },
    {
        type: "button",
        name: "ResetBtn",
        label: "Reset",
        className: "btn-secondary",
        onClick: (formData) => {
            console.log("Reset clicked:", formData);
        },
    },
];

export { formKey, searchDetailsForm };
