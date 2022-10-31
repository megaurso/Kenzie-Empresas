import { filterEnterprise, listEnterprise, listSectores } from "../../scripts/requestsApi.js";

const btnDropDown = document.querySelector("#btnDropDown")
const divDropDown = document.querySelector("#dropDown")
const imgDropDown = document.querySelector("#imgDropDown")
const divContents = document.querySelector("#divContent")

btnDropDown.addEventListener("click", () => {
    const divSelector = document.querySelector(".mySelectHome")
    divDropDown.classList.toggle("active")
    divSelector.classList.toggle("none")
    imgDropDown.src = "/assets/imgs/Vector.png"
})

async function selectSector() {
    const mySectors = await listSectores()
    const select = document.createElement("select")
    select.classList.add("mySelectHome")
    const firstOption = document.createElement("option")
    firstOption.innerText = "Selecionar Setor"
    mySectors.forEach(element => {
        const options = document.createElement("option")
        options.innerText = element.description

        // select.addEventListener("click",()=>{
        //     if(options.innerText == element.description){
        //         filterEnterprise(options)
        //     }
        // })

        select.append(firstOption, options)
        divContents.append(select)
    });
} selectSector()


async function renderEnterprise() {
    const enterprise = await listEnterprise()
    const divEnterprises = document.createElement("div")
    divEnterprises.classList.add("enterprises")
    enterprise.forEach(element => {
        const divContent = document.createElement("div")
        const divEachEnterprise = document.createElement("div")
        const enterpriseName = document.createElement("h1")
        const hours = document.createElement("span")
        const sector = document.createElement("span")

        divEachEnterprise.classList.add("eachEnterprise")
        enterpriseName.classList.add("enterpriseName")
        hours.classList.add("hours")
        sector.classList.add("sectorName")

        enterpriseName.innerText = element.name
        hours.innerText = `${element.opening_hours} Horas`
        sector.innerText = element.sectors.description

        divEachEnterprise.append(enterpriseName, hours, sector)
        divContent.appendChild(divEachEnterprise)
        divEnterprises.appendChild(divContent)
        divContents.append(divEnterprises)
    })
} renderEnterprise()
