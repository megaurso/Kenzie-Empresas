import { getLocalStorage } from "./localStorage.js"

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
            setTimeout(() => {
                window.location.replace("/pages/adminPage/index.html")
            }, 2000)
        } else if (isAdmin.is_admin == false) {
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




export {
    listSectores,
    listEnterprise,
    filterEnterprise,
    registerUser,
    login,
    listDepartments,
    listAllUsers,
    enterpriseDepartment,
    getInfoLoggedUser
}