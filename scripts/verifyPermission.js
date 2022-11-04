import { getLocalStorage } from "./localStorage.js"
import { typeUser } from "./requestsApi.js"

const verifyPermissionAdmin = async () => {
    const token = getLocalStorage()
    const verify = await typeUser()
    
    if (token == "") {
        window.location.replace("/index.html")
    }

    if(verify.is_admin == false){
        window.location.replace("/index.html")
    }

}

const verifyPermissionUser = async () => {
    const token = getLocalStorage()
    const verify = await typeUser()
    
    if (token == "") {
        window.location.replace("/index.html")
    }

    if(verify.is_admin){
        window.location.replace("/index.html")
    }

}

export{
    verifyPermissionAdmin,
    verifyPermissionUser
}