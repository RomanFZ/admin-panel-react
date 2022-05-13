export const required = (value: any) =>
  !value || value === "" ? "Поле обязательно для заполнения" : undefined;

export const maxLength = (max: any) => (value: any) =>
  value && value.length > max
    ? `Должно быть не более ${max} символов`
    : undefined;
export const maxLength15 = maxLength(15);
export const minLength = (min: any) => (value: any) =>
  value && value.length < min
    ? `Должно быть не менее ${min} символов`
    : undefined;

// const warn = (values) => {
//   const warnings = {};
//   if (values.age < 19) {
//     warnings.age = "Hmm, you seem a bit young...";
//   }
//   return warnings;
// };

// export const multipleValidations = (value, validations) => {
//   const checks = validations.map(validation => validation(value))
//   const failedChecks = checks.filter(check => !!check)
//
//   return failedChecks.length === 0 ? undefined : failedChecks.join(", ")
// }

// export const matchPasswords = (value, allValues, props, name) => {
//   if (allValues['password']) {
//     return value !== allValues['password'] ? "Passwords Don't Match" : undefined
//   } else {
//     return undefined
//   }
// }
// export const minLength2 = minLength(2);
// export const number = value =>
//   value && isNaN(Number(value)) ? 'Must be a number' : undefined
// export const minValue = min => value =>
//   value && value < min ? `Must be at least ${min}` : undefined
// export const minValue18 = minValue(18)
// export const email = value =>
//   value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
//     ? 'Invalid email address'
//     : undefined
// export const tooOld = value =>
//   value && value > 65 ? 'You might be too old for this' : undefined
// export const aol = value =>
//   value && /.+@aol\.com/.test(value)
//     ? 'Really? You still use AOL for your email?'
//     : undefined
// export const alphaNumeric = value =>
//   value && /[^a-zA-Z0-9 ]/i.test(value)
//     ? 'Only alphanumeric characters'
//     : undefined
// export const phoneNumber = value =>
//   value && !/^(0|[1-9][0-9]{9})$/i.test(value)
//     ? 'Invalid phone number, must be 10 digits'
//     : undefined

// export const validate: any = (props: any) => {
// const errors: any = {};
// if (!values.name) {
//   errors.name = "Поле обязательно для заполнения";
// } else if (values.name.length > 10) {
//   errors.name = "Максимально количество символов 10";
// }
// if (!values.doctor) {
//   errors.doctor = "Поле обязательно для заполнения";
// }
// if (!values.date) {
//   errors.date = "Поле обязательно для заполнения";
// }
// if (!values.complaint) {
//   errors.complaint = "Поле обязательно для заполнения";
// }
// return errors;
// };
