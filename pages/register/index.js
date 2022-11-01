import { registerUser } from "../../scripts/requestsApi.js"

const divDropDown = document.querySelector("#dropDown")
const imgDropDown = document.querySelector("#imgDropDown")

btnDropDown.addEventListener("click", () => {
    divDropDown.classList.toggle("active")
    imgDropDown.src = "/assets/imgs/Vector.png"
    if(divDropDown.classList.contains("active")){
        imgDropDown.src = "/assets/imgs/Vector.png"
    }else{
        imgDropDown.src = "/assets/imgs/Vector.svg"
    }
})

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
