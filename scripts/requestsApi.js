import { getLocalStorage } from "./localStorage.js"
import toast from "./toasts.js"
let backgroundContainerModal = document.querySelector(".modalBackground")

const baseUrl = "http://localhost:6278/"

async function listSectores() {
    const response = await (await (fetch(`${baseUrl}sectors`))).json()
    return response
}

async function listEnterprise() {
    const response = await (await (fetch(`${baseUrl}companies`))).json()
    return response
}

async function filterEnterprise(ele) {
    const response = await (await (fetch(`${baseUrl}companies/${ele}`))).json()
    return response
}

async function registerUser(body) {
    try {
        const request = await fetch(`${baseUrl}auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)

        })
        toast("Usuário registrado", "Sendo redirecionado para página de login")
        const response = await request.json()
    } catch (error) {
        console.log(error)
        return error
    }
}

async function login(body) {
    try {
        const request = await fetch(`${baseUrl}auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)

        })
        const response = await request.json()
        localStorage.setItem("token", JSON.stringify(response))
        const isAdmin = await typeUser(response.token)

        if (isAdmin.is_admin) {
            toast("Login efetuado com sucesso", "Sendo redirecionado para página de administrador")
            setTimeout(() => {
                window.location.replace("/pages/adminPage/index.html")
            }, 2000)
        } else if (isAdmin.is_admin == false) {
            toast("Login efetuado com sucesso", "Sendo redirecionado para página de usuário")
            setTimeout(() => {
                window.location.replace("/pages/userPage/index.html")
            }, 2000)
        }

    } catch (error) {
        console.log("error")
        setTimeout(() => {
            window.location.replace("/pages/register/index.html")
        }, 2000)
        return error
    }
}

async function typeUser(token) {
    try {
        const request = await fetch(`${baseUrl}auth/validate_user`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const response = await request.json()
        return response
    } catch (error) {
        console.log(error)
    }
}

async function listDepartments() {
    const token = getLocalStorage()
    try {
        const request = await fetch(`${baseUrl}departments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}`
            }
        })
        const response = await request.json()
        return response
    } catch (error) {
        console.log(error)
    }
}

async function listAllUsers() {
    const token = getLocalStorage()
    try {
        const request = await fetch(`${baseUrl}users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}`
            }
        })
        const response = await request.json()
        return response
    } catch (error) {
        console.log(error)
    }
}

async function enterpriseDepartment(id) {
    const token = getLocalStorage()

    try {
        const request = await fetch(`${baseUrl}departments/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}`
            }
        })
        const response = await request.json()
        return response
    } catch (error) {
        console.log(error)
    }
}

async function getInfoLoggedUser() {
    const token = getLocalStorage()
    try {
        const request = await fetch(`${baseUrl}users/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}`
            }
        })
        const response = await request.json()
        return response
    } catch (error) {
        console.log(error)
    }
}


async function editUserInfo(body) {
    const token = getLocalStorage()

    try {
        const request = await fetch(`${baseUrl}users`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}`
            },
            body: JSON.stringify(body)
        })
        const response = await request.json()
        return response
    } catch (error) {
        console.log(error)
    }
}

async function deleteUser(id) {
    const token = getLocalStorage()

    await fetch(`${baseUrl}admin/delete_user/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token.token}`
        }
    })
}

async function editUsers(body, id) {
    const token = getLocalStorage()

    try {
        const request = await fetch(`${baseUrl}admin/update_user/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}`
            },
            body:JSON.stringify(body)
        })
        const response = await request.json()
        return response
    }catch(error){
        console.log(error)
    }
}

async function listCoworkers(){
    const token = getLocalStorage()

    try{
        const request = await fetch(`${baseUrl}users/departments/coworkers`,{
            method:"GET",
            headers:{
                "Content-Type":"application.json",
                "Authorization":`Bearer ${token.token}`
            }
        })
        const response = await request.json()
        return response
    }catch(error){
        console.log(error)
    }
}

async function departmentsOfSameEnterprise(){
    const token = getLocalStorage()

    try{
        const request = await fetch(`${baseUrl}users/departments`,{
            method:"GET",
            headers:{
                "Content-Type":"application.json",
                "Authorization":`Bearer ${token.token}`
            }
        })
        const response = await request.json()
        return response
    }catch(error){
        console.log(error)
    }
}


export {
    listSectores,
    listEnterprise,
    filterEnterprise,
    registerUser,
    login,
    listDepartments,
    listAllUsers,
    enterpriseDepartment,
    getInfoLoggedUser,
    editUserInfo,
    deleteUser,
    editUsers,
    listCoworkers,
    departmentsOfSameEnterprise
}