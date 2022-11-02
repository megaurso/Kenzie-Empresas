let backgroundContainerModal = document.querySelector(".modalBackground")

const editUserForm = () => {
    const formulario = document.createElement("form")
    formulario.classList.add("formBase")

    formulario.insertAdjacentHTML("beforeend", `
        <h3 id="editUser">Editar Perfil</h3>
        <input placeholder="Seu nome" type="text" name="" class="inputsEdit">
        <input placeholder="Seu e-mail" type="email" name="" class="inputsEdit">
        <input placeholder="Sua senha" type="password" name="" class="inputsEdit">
        <button id="editUserBtn" type="submit">Editar perfil</button>
    
    `)
    return formulario
}

export{
    editUserForm
}