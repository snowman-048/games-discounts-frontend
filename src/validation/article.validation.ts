import * as yup from 'yup'

const htmlContentValidation = yup
  .string()
  .required()
  .test((value) => !!value.replaceAll('<p><br></p>', '').replaceAll('<p></p>', '').length)

export { htmlContentValidation }
