export const sendLoginData = async (data) => {
  try {
    const response = await $fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};