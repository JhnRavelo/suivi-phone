const useImages = () => {
  const imgForFormData = (images, formData) => {
    if (images && images?.length) {
      for (let i = 0; i < images.length; i++) {
        if (images[i].uri) {
          formData.append(`images`, {
            uri: images[i].uri,
            type: "image/jpeg",
            name: `image${i}.jpeg`,
          });
        }
      }
    } else if (images && !images?.length) {
      formData.append("image", {
        uri: images.uri,
        type: "image/jpeg",
        name: "image.jpeg",
      });
    }
  };
  return imgForFormData;
};

export default useImages;
