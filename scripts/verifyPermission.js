import { getLocalStorage } from "./localStorage.js"

const verifyPermission = () => {
    const token = getLocalStorage()

    if (token == "") {
        window.location.replace("/index.html")
    }

}

export{
    verifyPermission
}