export const getAllTeacherData = async () => {
  try {
    const res = $fetch("http://localhost:5000/teacher", {
      method: "GET",
      credentials: "include",
    });

    return res;
  } catch (error) {
    return null;
  }
};

export const createTeacherData = async (data) => {
  try {
    const res = $fetch("http://localhost:5000/teacher/add", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    return res;
  } catch (error) {
    return null;
  }
};

export const editTeacherData = async (data) => {
    try {
        const res = $fetch("http://localhost:5000/teacher/update", {
          method: "PUT",
          body: data,
          credentials: "include",
        });
    
        return res;
      } catch (error) {
        return null;
      }
}


export const deleteTeacherData = async (data) => {
    try {
        const res = $fetch("http://localhost:5000/teacher/delete", {
          method: "PUT",
          body: data,
          credentials: "include",
        });
    
        return res;
      } catch (error) {
        return null;
      }
}

export const activateTeacherData = async (data) => {
    try {
        const res = $fetch("http://localhost:5000/teacher/aktif", {
          method: "PUT",
          body: data,
          credentials: "include",
        });
    
        return res;
      } catch (error) {
        return null;
      }
}