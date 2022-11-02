import { editUserInfo } from "./requestsApi.js"

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

    formulario.addEventListener("submit",async (event)=>{
        const inputs = [...event.target]
        const edit = {}
        
        inputs.forEach(({name,value})=>{
            if(name){
                edit[name] = value
            }
        })
        await editUserInfo(edit)
        backgroundContainerModal.remove()
    })

    return formulario
}

export{
    editUserForm
}