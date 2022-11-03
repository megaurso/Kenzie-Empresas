import { creatNewDepartment, editDepartment, editUserInfo, listDepartments, listEnterprise } from "./requestsApi.js"

let backgroundContainerModal = document.querySelector(".modalBackground")

const editUserForm = () => {
    const formulario = document.createElement("form")
    formulario.classList.add("formBase")

    formulario.insertAdjacentHTML("beforeend", `
        <h3 id="editUser">Editar Perfil</h3>
        <input placeholder="Seu nome" type="text" name="username" class="inputsEdit">
        <input placeholder="Seu e-mail" type="email" name="email" class="inputsEdit">
        <input placeholder="Sua senha" type="password" name="password" class="inputsEdit">
        <button id="editUserBtn" type="submit">Editar perfil</button>
    
    `)

    formulario.addEventListener("submit", async (event) => {
        const inputs = [...event.target]
        const edit = {}

        inputs.forEach(({ name, value }) => {
            if (name) {
                edit[name] = value
            }
        })
        await editUserInfo(edit)
        backgroundContainerModal.remove()
    })

    return formulario
}

const creatANewDepartment = async () => {
    const enterprises = await listEnterprise()
    const formulario = document.createElement("form")
    formulario.classList.add("formNewDepartments")
    const h3 = document.createElement("h3")
    const nameDepart = document.createElement("input")
    const descriptionDepart = document.createElement("input")
    let select = document.createElement("select")
    const opt1 = document.createElement("option")
    const btn = document.createElement("button")

    h3.id = "newDepartment"
    nameDepart.classList.add("department")
    descriptionDepart.classList.add("department")
    select.id = "selectNewDepart"
    btn.id = "btnNewDepart"

    h3.innerText = "Criar Departamento"
    nameDepart.placeholder = "Nome do departamento"
    nameDepart.name = "name"
    descriptionDepart.placeholder = "Descrição"
    descriptionDepart.name = "description"
    opt1.innerText = "Selecionar empresa"
    btn.innerText = "Criar o departamento"

    enterprises.forEach((elem) => {
        const allOpt = document.createElement("option")
        allOpt.innerText = elem.name
        allOpt.value = elem.uuid
        select.name = "company_uuid"
        select.append(opt1, allOpt)
    })

    formulario.addEventListener("submit", async (event) => {
        const inputsAndSelect = [...event.target]
        const edit = {}

        inputsAndSelect.forEach(({ name, value }) => {
            if (name) {
                edit[name] = value
            }
        })
        await creatNewDepartment(edit)
        backgroundContainerModal.removeChild()
    })

    formulario.append(h3, nameDepart, descriptionDepart, select, btn)
    return formulario
}

const editDepartmentDescription = async (id) => {
    const departments = await listDepartments()

    const formulario = document.createElement("form")
    const h3 = document.createElement("h3")
    const descriptionDepart = document.createElement("textarea")
    const btnEdit = document.createElement("button")

    formulario.classList.add("editDepartsForm")
    h3.classList.add("editDepartsTitle")
    descriptionDepart.classList.add("descriptionDepartContent")
    btnEdit.classList.add("btnEditDepart")

    formulario.id = "editDepart"
    h3.innerText = "Editar Departamento"
    btnEdit.innerText = "Salvar alterações"


    const find = departments.find(elem => id == elem.uuid)
    descriptionDepart.value = find.description
    formulario.addEventListener("submit", async (event) => {
        event.preventDefault()
        const edit = {}
        const { value } = descriptionDepart
        edit.description = value
        
        console.log(value)
        await editDepartment(edit, id)
    })


    formulario.append(h3, descriptionDepart, btnEdit)

    return formulario
}

export {
    editUserForm,
    creatANewDepartment,
    editDepartmentDescription
}