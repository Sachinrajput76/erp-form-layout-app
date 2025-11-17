export const updateFormData = (formKey, path, value) => ({
  type: "UPDATE_FORM_DATA",
  payload: { formKey, path, value },
});
