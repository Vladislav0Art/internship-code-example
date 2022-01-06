import { createContext } from 'react';


// form context
const FormContext = createContext({
  form: {},
  handleFormInputChange: () => {}
});

export default FormContext;