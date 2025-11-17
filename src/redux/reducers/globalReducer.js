const initialState = {
  apiData: {
    data: {},
    sidebarExtended: false,
  },
  formData: {},
};

export default function globalReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_FORM_DATA": {
      const { formKey, path, value } = action.payload;

      const updatedForm = { ...(state.formData[formKey] || {}) };

      let target = updatedForm;
      const keys = path.split(".");
      const lastKey = keys.pop();

      keys.forEach((key) => {
        if (!target[key]) target[key] = {};
        target = target[key];
      });

      target[lastKey] = value;

      return {
        ...state,
        formData: {
          ...state.formData,
          [formKey]: updatedForm
        },
      };
    }

    default:
      return state;
  }
}
