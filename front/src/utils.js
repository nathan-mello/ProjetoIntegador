export const formElements2Array = (elements) =>
  [].slice.call(elements);

export const getValuesFromForm = (target) => {
  const elements = formElements2Array(target.elements);
  const inputElements = elements.filter((elem) => elem.value && elem.type);
  const inputValues = inputElements.map((elem) => elem.value);
  return inputValues;
}