const toast = (title,message) =>{
    const body = document.querySelector("body");
    const container = document.createElement("div");
    const icon = document.createElement("img");
    const textContainer = document.createElement("div")    
    const imgContainer = document.createElement("div")
    const h3 = document.createElement("h3")
    const span = document.createElement("span")

    
    container.classList.add("toastContainer")
    icon.classList.add("imgToast")
    imgContainer.classList.add("textContainer")
    h3.classList.add("title")
    span.classList.add("spanOk")
    


    icon.alt = `Mensagem de ${title}`
  
    container.classList.add("successToast")
    icon.src = "/assets/imgs/símbolo-correto-verde-do-vetor-116379582.jpg"

    h3.innerText = title
    span.innerText = message



    imgContainer.append(icon,h3)
    textContainer.append(imgContainer,span)
    container.append(textContainer)
    body.appendChild(container)
}

const toastError = (title,message) =>{
    const body = document.querySelector("body");
    const container = document.createElement("div");
    const textContainer = document.createElement("div")    
    const imgContainer = document.createElement("div")
    const h3 = document.createElement("h3")
    const span = document.createElement("span")

    
    container.classList.add("toastContainer")
    imgContainer.classList.add("textContainer")
    h3.classList.add("titleError")
    span.classList.add("spanError")
    


  
    container.classList.add("errorToast")

    h3.innerText = title
    span.innerText = message



    imgContainer.append(h3)
    textContainer.append(imgContainer,span)
    container.append(textContainer)
    body.appendChild(container)
}

export{
    toast,
    toastError
} 