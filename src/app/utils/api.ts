'use client'

export async function fetchCoronaData1(): Promise<any> {
    return new Promise<any>((resolve, reject) => {  
        fetch('/api/corona/data1')
        .then((response) => response.json())        
        .then (data => {
            console.log("fetch data: ", data);
            resolve(data.corona);
        })
        .catch((err) => {
            reject(err);
        });
    });
}
export async function fetchCoronaData2(): Promise<any> {
    return new Promise<any>((resolve, reject) => {  
        fetch('/api/corona/data2')
        .then((response) => response.json())        
        .then (data => {
            console.log("fetch data: ", data);
            resolve(data.corona);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

