export const sendFileScratch = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await $fetch("http://localhost:5000/predict", {
      method: 'POST',
      body: formData,
      credentials: "include"
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

