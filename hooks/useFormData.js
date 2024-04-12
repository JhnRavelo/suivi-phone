const useFormData = () => {
  const putDataInFormData = (body, formData) => {
    const bodyEntries = Object.entries(body);
    bodyEntries.forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
  };
  return putDataInFormData;
};

export default useFormData;
