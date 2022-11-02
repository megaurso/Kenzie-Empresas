import { login } from "../../scripts/requestsApi.js"

const eventLogin = () => {
    const form = document.querySelector("form")
    const elements = [...form.elements]
    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        const body = {}
        elements.forEach((elem) => {
            if(elem.tagName == "INPUT" && elem.value !== ""){
                body[elem.id] = elem.value
            }
        })
        await login(body)
    })
}

eventLogin()

