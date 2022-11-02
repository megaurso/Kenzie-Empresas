import {  listAllUsers, listDepartments, listEnterprise } from "../../scripts/requestsApi.js"
import { verifyPermission } from "../../scripts/verifyPermission.js"
const logout = document.querySelector("#logout")
const departments = await listDepartments()
const users = await listAllUsers()
verifyPermission()

logout.addEventListener("click", () => {
    localStorage.removeItem("token")
})


verifyPermission()

function creatDepartmentsList() {
    const ul = document.querySelector("#ulDepartments")
    departments.forEach((element) => {
        const li = document.createElement("li")
        const h2 = document.createElement("h2")
        const description = document.createElement("p")
        const nameCompany = document.createElement("p")
        const div = document.createElement("div")
        const btnViewDepartments = document.createElement("img")
        const btnEdiDepartments = document.createElement("img")
        const btnDeleteDepartments = document.createElement("img")

        li.classList.add("liDepartments")
        h2.classList.add("titleDepartments")
        description.classList.add("descriptionDepartments")
        nameCompany.classList.add("nameCompany")
        div.classList.add("containerImgs")

        h2.innerText = element.name
        description.innerText = element.description
        nameCompany.innerText = element.companies.name
        btnViewDepartments.src = "/assets/imgs/Vector (1).png"
        btnEdiDepartments.src = "/assets/imgs/Vector (2).png"
        btnDeleteDepartments.src = "/assets/imgs/Vector (3).png"



        div.append(btnViewDepartments, btnEdiDepartments, btnDeleteDepartments)
        li.append(h2, description, nameCompany, div)
        ul.appendChild(li)

    });
}

function creatRegisterUser() {
    const ul = document.querySelector("#ulRegisters")
    users.forEach((elem) => {
        const li = document.createElement("li")

        const h2 = document.createElement("h2")
        const level = document.createElement("span")
        const nameCompany = document.createElement("p")
        const div = document.createElement("div")
        const btnEditUser = document.createElement("img")
        const btnDeleteUser = document.createElement("img")

        li.classList.add("liUsers")
        h2.classList.add("titleDepartments")
        level.classList.add("descriptionDepartments")
        nameCompany.classList.add("nameCompany")
        div.classList.add("containerImgs")


        h2.innerText = elem.username
        level.innerText = elem.professional_level
        departments.forEach((depart) => {
            if (elem.department_uuid == null) {
                nameCompany.innerText = "Desemprego"
            } else if (elem.department_uuid == depart.uuid) {
                nameCompany.innerText = depart.companies.name
            }
        })
        btnEditUser.src = "/assets/imgs/Vector (2).png"
        btnDeleteUser.src = "/assets/imgs/Vector (3).png"

        div.append(btnEditUser, btnDeleteUser)
        li.append(h2, level, nameCompany, div)
        ul.appendChild(li)
    })
}
creatRegisterUser()

async function selectOptions() {
    let select = document.querySelector("select")
    const enterprises = await listEnterprise()
    creatDepartmentsList()
    enterprises.forEach((elem) => {
        const options = document.createElement("option")

        options.innerText = elem.description
        options.value = elem.description

        // departments.forEach((departs) => {
        //     select.addEventListener("change", async () => {
        //         const value = select.value
        //         const ul = document.querySelector("#ulDepartments")
        //         ul.innerHTML = ""
        //         const filter = await enterpriseDepartment(value)
        //         console.log(filter)
        //         RenderSelectOptions(filter)
        //     })

        // })
        select.append(options)
    })
}
selectOptions()

// function RenderSelectOptions(companies) {
//     const ul = document.querySelector("#ulDepartments")
//     companies.forEach((element) => {
//         const li = document.createElement("li")
//         const h2 = document.createElement("h2")
//         const description = document.createElement("p")
//         const nameCompany = document.createElement("p")
//         const div = document.createElement("div")
//         const btnViewDepartments = document.createElement("img")
//         const btnEdiDepartments = document.createElement("img")
//         const btnDeleteDepartments = document.createElement("img")

//         li.classList.add("liDepartments")
//         h2.classList.add("titleDepartments")
//         description.classList.add("descriptionDepartments")
//         nameCompany.classList.add("nameCompany")
//         div.classList.add("containerImgs")

//         h2.innerText = element.name
//         description.innerText = element.description
//         nameCompany.innerText = element.companies.name
//         btnViewDepartments.src = "/assets/imgs/Vector (1).png"
//         btnEdiDepartments.src = "/assets/imgs/Vector (2).png"
//         btnDeleteDepartments.src = "/assets/imgs/Vector (3).png"



//         div.append(btnViewDepartments, btnEdiDepartments, btnDeleteDepartments)
//         li.append(h2, description, nameCompany, div)
//         ul.appendChild(li)

//     });
// }