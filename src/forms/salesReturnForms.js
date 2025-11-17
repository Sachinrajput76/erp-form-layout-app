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
            { value: "item1", label: "Item 1" },
            { value: "item2", label: "Item 2" },
            { value: "item3", label: "Item 3" }
        ],
    },
    {
        type: "dropdown",
        name: "Party Name",
        path: "Header.PartyName",
        label: "Party Name",
        required: true,
        options: [
            { value: "party1", label: "Party 1" },
            { value: "party2", label: "Party 2" },
            { value: "party3", label: "Party 3" }
        ],
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
        label: "Return Type",
        required: true,
        options: [
            { value: "full", label: "Full Return" },
            { value: "partial", label: "Partial Return" },
        ],
    },

    // 🔽 TEXTAREA
    {
        type: "textarea",
        name: "Remarks",
        path: "Header.Remarks",
        label: "Remarks",
        placeholder: "Enter remarks here",
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
