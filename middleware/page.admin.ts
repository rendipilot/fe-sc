export default defineNuxtRouteMiddleware(async (to, from) => {

    interface UserResponse {
      user_id: string;
      username: string;
      email: string;
      role: string;
      active: boolean;
    }
    
  
    const userData = useUserStore()
  
    try {
      if (process.server) {
        console.log("memanggil dot.met dari content page server");
        const headers = useRequestHeaders(["cookie"]);
        const res: UserResponse = await $fetch("http://localhost:5000/me", {
          method: "GET",
          headers: headers.cookie ? { Cookie: headers.cookie } : {},
          credentials: "include",
        });

        console.log("data res", res)
        
        if(res.role !== 'admin'){
            throw new Error("not admin");
        }

        userData.setUser(res)
      }else if (process.client) {
        console.log("memanggil dot.met dari content page local");
        const res: UserResponse = await $fetch("http://localhost:5000/me", {
          method: "GET",
          credentials: "include",
        });

        console.log("data res", res)

        if(res.role !== 'admin'){
            throw new Error("not admin");
        }
  
        userData.setUser(res)
      }
    } catch (e) {
      console.log("User not authenticated", e);
      if(e === "not admin"){
        return navigateTo("/")
      }else{
        return navigateTo("/login")
      }
    }
  });