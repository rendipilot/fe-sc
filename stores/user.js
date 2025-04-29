// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(userData) {
      this.user = userData;
    },
    clearUser() {
      this.user = null;
    },
    async login(data){
      try {
        const res = await $fetch('http://localhost:5000/login', {
          method: 'POST',
          body: JSON.stringify(data),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if(res.valid){
          return res;
        }

        throw new Error(res.message)
      } catch (error) {
        console.error("Login error:", error);
        return {"valid" : false};
      }
    },
    async logout(){
      try {
        const res = await $fetch('http://localhost:5000/logout', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if(res.valid){
          console.log("user data dihapus")
          this.user = null
          return res;
        }

        throw new Error(res.message)
      } catch (error) {
        console.error("Logout error:", error);
        return null;
      }
    }
  },
})
