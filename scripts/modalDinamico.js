const body = document.querySelector("body")

async function openModal(children){
    const backgroundContainer = document.createElement("section")
    const mainContainer = document.createElement("section")
    const closeModalButton = document.createElement("button")

    backgroundContainer.classList.add("modalBackground")
    mainContainer.classList.add("modalContainer")
    closeModalButton.classList.add("modalClose")

    closeModalButton.innerText = "X"

    backgroundContainer.addEventListener("click",(event)=>{
        const {className} = event.target
        if(className === "modalBackground" || className === "modalClose" || className =="cancel" || className =="btnCancel"){
            backgroundContainer.remove()
        }
    })

    mainContainer.appendChild(closeModalButton)
    mainContainer.append(children)
    backgroundContainer.appendChild(mainContainer)
    body.appendChild(backgroundContainer)
}


export{
    openModal,
}