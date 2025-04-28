export const changePassword = async(data) => {
    try {
        const res = await $fetch("http://localhost:5000/user/change-password",{
            method : 'PUT',
            body: data,
            credentials : "include"
        })

        return res
    } catch (error) {
        return error
    }
}

export const updateDataUser = async (data) => {
    try {
        const res = await $fetch("http://localhost:5000/user/update",{
            method : 'PUT',
            body: data,
            credentials : "include"
        })

        return res
    } catch (error) {
        return error
    }
}