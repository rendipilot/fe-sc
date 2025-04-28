

export const getAllDataHistoriesForOneTeacher = async () => {
  try {
    const res = await $fetch("http://localhost:5000/history/teacher", {
      method: "GET",
      credentials: "include",
    });
    console.log("mendapatkan data histories teacher = ", res);

    return res;
  } catch (error) {
    console.log("error dalam mengambil data histories ", error);
    return null;
  }
};

export const getAllDataHistories = async () => {
    try {
      const res = await $fetch("http://localhost:5000/history", {
        method: "GET",
        credentials: "include",
      });
      console.log("mendapatkan data histories teacher = ", res);
  
      return res;
    } catch (error) {
      console.log("error dalam mengambil data histories ", error);
      return null;
    }
  };
