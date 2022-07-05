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
export const minLength2 = minLength(2);
