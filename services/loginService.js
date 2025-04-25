import axios from "axios";

export const sendLoginData = async (data) => {
    console.log("data yang dikirim ", data)
  try {
    const res = await axios.post("http://localhost:5000/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log("Mengirimkan data");

    if (res.status === 200) {
      return res.data;
    } else {
      console.error("Login gagal dengan status: ", res.status);
      return null;
    }
  } catch (error) {
    console.log("Error login = ", error);
    return null;
  }
};
