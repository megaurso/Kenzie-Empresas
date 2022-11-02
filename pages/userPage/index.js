import { editUserForm } from "../../scripts/forms.js"
import { openModal } from "../../scripts/modalDinamico.js"
import { getInfoLoggedUser } from "../../scripts/requestsApi.js"
import { verifyPermission } from "../../scripts/verifyPermission.js"
verifyPermission()
const userInfo = await getInfoLoggedUser()

logout.addEventListener("click", () => {
    localStorage.removeItem("token")
})

function creatUserInfo() {
    const section = document.querySelector("#sectionUser")
    const userName = document.createElement("h1")
    const divInfo = document.createElement("div")
    const email = document.createElement("span")
    const cargo = document.createElement("span")
    const kindOfWork = document.createElement("span")
    const editUser = document.createElement("img")

    userName.classList.add("userName")
    divInfo.classList.add("divInfo")
    email.classList.add("email")
    cargo.classList.add("capitalize")
    kindOfWork.classList.add("work")
    editUser.classList.add("editUser")


    userName.innerText = userInfo.username
    email.innerText = `Email:${userInfo.email}`
    cargo.innerText = userInfo.professional_level
    kindOfWork.innerText = userInfo.kind_of_work
    editUser.src = "/assets/imgs/Vector (4).png"


    editUser.addEventListener("click",()=>{
        const view = editUserForm()
        openModal(view)
    })



    divInfo.append(email,cargo,kindOfWork,editUser)
    section.append(userName,divInfo)
} creatUserInfo()


