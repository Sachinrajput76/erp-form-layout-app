const initialState = {
  formData: {},
  apiData: { data: {} }
};

export default function globalReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_FORM_DATA":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.formKey]: {
            ...state.formData[action.formKey],
            ...updateNestedPath(
              state.formData[action.formKey] || {},
              action.path,
              action.value
            )
          }
        }
      };

    default:
      return state;
  }
}

function updateNestedPath(obj, path, value) {
  const keys = path.split(".");
  let temp = { ...obj };
  let current = temp;

  keys.forEach((k, i) => {
    if (i === keys.length - 1) {
      current[k] = value;
    } else {
      current[k] = current[k] ? { ...current[k] } : {};
      current = current[k];
    }
  });

  return temp;
}
