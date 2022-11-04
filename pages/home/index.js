import { filterEnterprise, listEnterprise, listSectores } from "../../scripts/requestsApi.js";

const btnDropDown = document.querySelector("#btnDropDown")
const divDropDown = document.querySelector("#dropDown")
const imgDropDown = document.querySelector("#imgDropDown")

btnDropDown.addEventListener("click", () => {
    const divSelector = document.querySelector(".mySelectHome")
    divDropDown.classList.toggle("active")
    divSelector.classList.toggle("none")
    if(divDropDown.classList.contains("active")){
        imgDropDown.src = "/assets/imgs/Vector.png"
    }else{
        imgDropDown.src = "/assets/imgs/Vector.svg"
    }
})

async function selectSector() {
    const mySectors = await listSectores()
    let select = document.querySelector("select")
    renderEnterprise()
    
    mySectors.forEach(element => {
        const options = document.createElement("option")
       
        options.innerText = element.description
        options.value = element.description


        select.append(options)
    });

    select.addEventListener("change", async () => {
        const value = select.value
        const divEnterprises = document.querySelector(".enterprises")
        divEnterprises.innerHTML = ""
        const enterprise = await filterEnterprise(value)
        renderFilterEnterprise(enterprise)

    })

} selectSector()

async function renderEnterprise() {
    const enterprise = await listEnterprise()
    const divEnterprises = document.querySelector(".enterprises")
    enterprise.forEach(element => {
        const divContent = document.createElement("li")
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
        divContent.append(divEachEnterprise)
        divEnterprises.append(divContent)

    })
}

async function renderFilterEnterprise(list) {
    
    const divEnterprises = document.querySelector(".enterprises")
    list.forEach(element => {
        const divContent = document.createElement("li")
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
        divContent.append(divEachEnterprise)
        divEnterprises.append(divContent)
    })
}



