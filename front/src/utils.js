export const formElements2Array = (elements) =>
  [].slice.call(elements);

export const isInput = ({ type }) => 
  type === 'tel' || type === 'text' || type === 'number' || type === 'email';

export const getValuesFromForm = (target) => {
  const elements = formElements2Array(target.elements);
  const inputElements = elements.filter(isInput);
  const inputValues = inputElements.map((elem) => elem.value);
  return inputValues;
}

export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export const getAllBase64 = files =>
  files.map(f => toBase64(f));

export const formatDocuments = async (files) => {
  return Promise.all(getAllBase64(files))
    .then(values => values.map(v => {
      if (v.includes('image')) {
        return v.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
      }
      return v.replace(/^data:application\/(pdf);base64,/, ""); 
    }));
}

export const formatFilesToServer = (files, files64) => 
  files.map((f, i) => ({
    name: f.name,
    file: files64[i]
  }));

export const formatValuesToForm = (values, files, files64) => {
  return ({
    name: values[0],
    email: values[1],
    phoneNumber: values[2],
    cpf: values[3],
    address: values[4],
    previousUniversity: values[5],
    course: values[6],
    documents: formatFilesToServer(files, files64)
  });
}