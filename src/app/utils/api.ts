'use client'

export async function fetchCoronaData(): Promise<any> {
    return new Promise<any>((resolve, reject) => {  
        const headers = {            
        }        

        fetch('https://coronavirus.data.gov.uk/details/developers-guide/main-api', {headers: headers})
        .then((response) => response.text())
        .then((html) => new DOMParser().parseFromString(html, "text/html"))
        .then (data => {
            console.log("fetch data: ", data);
            resolve(data);
        })
        .catch((err) => {
            reject(err);
        });
    });
}