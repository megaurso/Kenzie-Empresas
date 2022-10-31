const divDropDown = document.querySelector("#dropDown")
const imgDropDown = document.querySelector("#imgDropDown")

btnDropDown.addEventListener("click", () => {
    divDropDown.classList.toggle("active")
    imgDropDown.src = "/assets/imgs/Vector.png"
})
