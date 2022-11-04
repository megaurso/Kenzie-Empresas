import { editUserForm } from "../../scripts/forms.js"
import { openModal } from "../../scripts/modalDinamico.js"
import { departmentsOfSameEnterprise, getInfoLoggedUser, listCoworkers } from "../../scripts/requestsApi.js"
import { verifyPermissionUser } from "../../scripts/verifyPermission.js"
verifyPermissionUser()
const userInfo = await getInfoLoggedUser()
const coworkers = await listCoworkers()
const sameEnterprise = await departmentsOfSameEnterprise()

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


    editUser.addEventListener("click", () => {
        const view = editUserForm()
        openModal(view)
    })

    if(userInfo.department_uuid == null){
        noJobUser()
    }else{
        renderContentJob()
    }


    divInfo.append(email, cargo, kindOfWork, editUser)
    section.append(userName, divInfo)
} creatUserInfo()

function renderContentJob() {
    const section = document.querySelector("#sectionJob")
    const companyAndDepartment = document.createElement("div")
    const nameCompany = document.createElement("h2")
    const nameDepartment = document.createElement("h2")
    const ul = document.createElement("ul")

    section.innerHTML = ""
    const departments = sameEnterprise.departments

    companyAndDepartment.classList.add("divNameJob")
    nameCompany.classList.add("names")
    nameDepartment.classList.add("names")


    nameCompany.innerText = `${sameEnterprise.name} -`
    departments.forEach((element) => {
        if (element.uuid == userInfo.department_uuid) {
            nameDepartment.innerText = element.name
        }
    });

    coworkers.forEach((elem) => {
        const users = elem.users
        users.forEach((usu) => {
            const li = document.createElement("li")
            const h3 = document.createElement("h3")
            const span = document.createElement("span")

            h3.classList.add("nameCoworker")
            span.classList.add("level")

            h3.innerText = usu.username
            span.innerText = usu.professional_level

            li.append(h3, span)
            ul.append(li)
        })
    })

    section.append(companyAndDepartment,ul)
    companyAndDepartment.append(nameCompany, nameDepartment)
} 

function noJobUser(){
    const sectionJob = document.querySelector("#sectionJob")
    const h1 = document.querySelector("#noJob")
    h1.id = "noJob"
    h1.innerText = "Você ainda não foi contratado"

    sectionJob.appendChild(h1)
}