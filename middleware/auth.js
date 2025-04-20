export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('scr-token');

    if(!token.value){
        return navigateTo("/login")
    }
})