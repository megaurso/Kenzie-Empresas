import { getLocalStorage } from "./localStorage.js"
import { toast, toastError } from "./toasts.js"

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
        localStorage.setItem("token", JSON.stringify(response.token))
        const isAdmin = await typeUser()

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
        }else{
            toastError("Algo deu errado","Verifique seu email ou senha e tente novamente")
        }

    } catch (error) {
        toastError("Algo deu errado","Verifique seu email ou senha e tente novamente")
        setTimeout(() => {
            window.location.replace("/pages/register/index.html")
        }, 2000)
    }
}

async function typeUser() {
    const token = getLocalStorage()
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
                "Authorization": `Bearer ${token}`
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
                "Authorization": `Bearer ${token}`
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
                "Authorization": `Bearer ${token}`
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
                "Authorization": `Bearer ${token}`
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
                "Authorization": `Bearer ${token}`
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
            "Authorization": `Bearer ${token}`
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
                "Authorization": `Bearer ${token}`
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
                "Authorization":`Bearer ${token}`
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
                "Authorization":`Bearer ${token}`
            }
        })
        const response = await request.json()
        return response
    }catch(error){
        console.log(error)
    }
}

async function creatNewDepartment(body){
    const token = getLocalStorage()
    try{
        const request = await fetch(`${baseUrl}departments`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        const response = await request.json()
        return response
    }catch(error){
        console.log(error)
    }
}

async function editDepartment(body,id){
    const token = getLocalStorage()
    try{
        const request = await fetch(`${baseUrl}departments/${id}`,{
            method:"PATCH",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        const response = await request.json()
        return response
    }catch(error){
        console.log(error)
    }
}

async function deleteDepart(id){
    const token = getLocalStorage()
    await fetch(`${baseUrl}departments/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}

async function contractUser(body){
    const token = getLocalStorage()
    try{
        const request = await fetch(`${baseUrl}departments/hire/`,{
            method:"PATCH",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        const response = await request.json()
        return response
    }catch(error){
        console.log(error)
    }
}

async function deleteOneUser(id){
    const token = getLocalStorage()
    await fetch(`${baseUrl}admin/delete_user/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}

async function outOfWWork(){
    const token = getLocalStorage()

    try{
        const request = await fetch(`${baseUrl}admin/out_of_work`,{
            method:"GET",
            headers:{
                "Content-Type":"application.json",
                "Authorization":`Bearer ${token}`
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
    departmentsOfSameEnterprise,
    creatNewDepartment,
    editDepartment,
    deleteDepart,
    contractUser,
    deleteOneUser,
    outOfWWork,
    typeUser
}