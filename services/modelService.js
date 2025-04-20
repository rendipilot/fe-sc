import axios from "axios";

export const sendFileScratch = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("http://localhost:5000/predict", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

