import { registerUser } from "../../scripts/requestsApi.js"


const register = () => {
    const form = document.querySelector("form")
    const elements = [...form.elements]
    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        const body = {}
        setTimeout(() => {
            window.location.replace("/pages/login/index.html")
        }, 2000)
        elements.forEach((elem) => {
            if (elem.tagName == "INPUT" && elem.value !== "") {
                body[elem.id] = elem.value
            }
        })
        await registerUser(body)
    })
}
register()
