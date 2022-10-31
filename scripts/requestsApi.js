const baseUrl = "http://localhost:6278/"

async function listSectores(){
    const response = await(await (fetch(`${baseUrl}sectors`))).json()
    return response
}

async function listEnterprise(){
    const response = await(await(fetch(`${baseUrl}companies`))).json()
    return response
}

async function filterEnterprise(ele){
    const response = await(await(fetch(`${baseUrl}companies/${ele}`))).json()
    return response
}


export{
    listSectores,
    listEnterprise,
    filterEnterprise
}