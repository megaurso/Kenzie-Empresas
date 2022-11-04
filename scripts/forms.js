import { contractUser, creatNewDepartment, deleteDepart, deleteOneUser, editDepartment, editUserInfo, listAllUsers, listDepartments, listEnterprise, outOfWWork } from "./requestsApi.js"
import toast from "./toasts.js"

let backgroundContainerModal = document.querySelector(".modalBackground")

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

const viewDepart = async (element) => {
    const allUsers = await listAllUsers()
    const outWork = await outOfWWork()
    

    const divModal = document.createElement("div")
    const nameDepart = document.createElement("h3")
    const divDescriUser = document.createElement("div")
    const divMother = document.createElement("form")
    const descridepart = document.createElement("h2")
    const selectUser = document.createElement("select")
    const firtsOpt = document.createElement("option")
    const divEnterpriseBtn = document.createElement("div")
    const enterprise = document.createElement("span")
    const btnContract = document.createElement("button")
    const ul = document.createElement("ul")
    
    divModal.id = "modalViewDepart"
    nameDepart.id = "modalViewName"
    divDescriUser.id = "divUserForContract"
    descridepart.id = "depart-description"
    selectUser.id = "depart-selectUser"
    divEnterpriseBtn.id = "divEnterpriseBtn"
    enterprise.id = "wichEnterprise"
    btnContract.id = "btnContractOneUser"
    divMother.id = "divMother"
    ul.id = "ulCoworkers"

    nameDepart.innerText = element.name
    descridepart.innerText = element.description
    enterprise.innerText = element.companies.name
    firtsOpt.innerText = "Selecionar usuário"
    btnContract.innerText = "Contratar"

    outWork.forEach((elemen)=>{

        const allOpt = document.createElement("option")
        allOpt.innerText = elemen.username
        allOpt.value = elemen.uuid
        selectUser.append(firtsOpt, allOpt)
    })
    allUsers.forEach((elem) => {
        if (elem.department_uuid == element.uuid) {
            const lis = document.createElement("li")
            const h3 = document.createElement("h3")
            const level = document.createElement("span")
            const companyName = document.createElement("span")
            const divBtn = document.createElement("div")
            const btn = document.createElement("button")

            lis.id = "lisOfContract"
            h3.id = "nameOfUser"
            level.classList.add("levelAndCompany")
            companyName.classList.add("levelAndCompany")
            btn.id = "btnFired"
            divBtn.id = "divBtn"

            h3.innerText = elem.username
            level.innerText = elem.professional_level
            companyName.innerText = element.companies.name
            btn.innerText = "Desligar"

            btn.addEventListener("click", () => {
                deleteOneUser(elem.uuid)
                toast("Usuário deletado com sucesso", "Usuário não existe mais no banco de dados")
                setTimeout(()=>{
                    window.location.reload()
                },1500)
            })

            divBtn.append(btn)
            lis.append(h3, level, companyName, divBtn)
            ul.append(lis)
        }
    })

    btnContract.addEventListener("click", async(event) => {
        event.preventDefault()

        let body = {
            user_uuid:selectUser.value,
            department_uuid:element.uuid
        }
        await contractUser(body)
        toast("Usuário contratado","Usuário agora faz parte do departamento")
        setTimeout(()=>{
            window.location.reload()
        },1500)
    })


    divEnterpriseBtn.append(enterprise, btnContract)
    divMother.append(divDescriUser, divEnterpriseBtn)
    divDescriUser.append(descridepart, selectUser)
    divModal.append(nameDepart, divMother, ul)

    return divModal
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
        const edit = {}
        const { value } = descriptionDepart
        edit.description = value

        await editDepartment(edit, id)
    })

    formulario.append(h3, descriptionDepart, btnEdit)

    return formulario
}

const deleteMyDepart = async (depart, name) => {
    const formulario = document.createElement("form")
    formulario.id = "formDel"
    formulario.insertAdjacentHTML("beforeend", `
        <div id="divMaster">
        <h3 id="confirmDelete">Realmente deseja deletar o
        Departamento ${name} e demitir seus funcionários?</h3>
        <button id="btnDeleteDepart">Confirmar</button>
        </div>
    `)

    formulario.addEventListener("submit", async (event) => {
        await deleteDepart(depart)
        backgroundContainerModal.remove()
    })
    return formulario
}

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

export {
    editUserForm,
    creatANewDepartment,
    editDepartmentDescription,
    deleteMyDepart,
    viewDepart
}