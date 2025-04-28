export default defineNuxtRouteMiddleware(async (to, from) => {
  interface UserData {
    user_id: string;
    username: string;
    email: string;
    role: string;
    active: boolean;
  }

  interface UserResponse {
    data: UserData;
    valid: boolean;
  }

  try {
    if (process.server) {
      console.log("memanggil dot.met dari login page server");
      const headers = useRequestHeaders(["cookie"]);
      const res: UserResponse = await $fetch("http://localhost:5000/me", {
        method: "GET",
        headers: headers.cookie ? { Cookie: headers.cookie } : {},
        credentials: "include",
      });

      console.log("data res",res)

      if (res && to.path === "/login") {
        console.log("return navigate dipanggil",res)
        return navigateTo("/");
      }
    }else if (process.client) {
      console.log("memanggil dot.met dari login page local");
      const res: UserResponse = await $fetch("http://localhost:5000/me", {
        method: "GET",
        credentials: "include",
      });

      console.log("data res",res)

      if (res && to.path === "/login") {
        console.log("return navigate dipanggil=", res)
        return navigateTo("/");
      }
    }
  } catch (e) {
    console.log("User not authenticated");
  }
});
