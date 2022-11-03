import { openModal } from "../../scripts/modalDinamico.js"
import { deleteUser, editUsers, listAllUsers, listDepartments, listEnterprise } from "../../scripts/requestsApi.js"
import toast from "../../scripts/toasts.js"
import { verifyPermission } from "../../scripts/verifyPermission.js"
const logout = document.querySelector("#logout")
const departments = await listDepartments()
const users = await listAllUsers()
verifyPermission()
logout.addEventListener("click", () => {
    localStorage.removeItem("token")
})

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
                nameCompany.innerText = "desempregado"
                nameCompany.classList.add("hidden")
            } else if (elem.department_uuid == depart.uuid) {
                nameCompany.innerText = depart.companies.name
            }
        })
        btnEditUser.src = "/assets/imgs/Vector (2).png"
        btnDeleteUser.src = "/assets/imgs/Vector (3).png"

        btnEditUser.addEventListener("click", () => {
            openModal(editOneUser())
        })

        const editOneUser = () => {
            const divContainer = document.createElement("form")
            divContainer.classList.add("editUsersContainer")

            divContainer.insertAdjacentHTML("beforeend", `
                <h1 id="editTitle">Editar Usuário</h1>
                <select class="selectKindOfWork" name="kind_of_work">
                    <option>Selecionar modalidade de trabalho</option>
                    <option>home office</option>
                    <option>presencial</option>
                    <option>hibrido</option>
                </select>
                <select class="selectKindOfWork" name="professional_level">
                    <option>Selecionar nível profissional</option>
                    <option>estágio</option>
                    <option>júnior</option>
                    <option>pleno</option>
                    <option>sênior</option>
                </select>
                <button id="btnEditAdmin">Editar</button>
            `)

            divContainer.addEventListener("submit", async (event) => {
                event.preventDefault()
                const selects = [...event.target]
                let backgroundContainerModal = document.querySelector(".modalBackground")

                const edit = {}

                selects.forEach(({ name, value }) => {
                    if (name) {
                        edit[name] = value
                    }
                })
                await editUsers(edit, elem.uuid)
                toast("Usuário editado","Usuário teve seu tipo de trabalho e nivel profissional alterado")
                backgroundContainerModal.remove()
                setTimeout(() => {
                    location.reload()
                }, 1500)
            })
            return divContainer
        }

        btnDeleteUser.addEventListener("click", () => {
            openModal(deleteOneUser())
        })

        const deleteOneUser = () => {
            const divContainer = document.createElement("div")
            divContainer.classList.add("editDivDelete")
            divContainer.insertAdjacentHTML("beforeend", `
                <h1 id="deleteUserTitle">Realmente deseja remover o usuário ${elem.username}?</h1>
                <button id="btnDeleteUser" type="submit">Deletar</button>
            `)

            divContainer.addEventListener("click", (event) => {
                event.preventDefault()
                let backgroundContainerModal = document.querySelector(".modalBackground")

                deleteUser(elem.uuid)
                toast("Usuário deletado", "Usuário não existe mais no banco de dados")
                backgroundContainerModal.remove()
                setTimeout(() => {
                    location.reload()
                }, 1500)
            })

            return divContainer
        }

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