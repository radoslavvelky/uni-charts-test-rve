'use client';

import {Favour} from "./definition";

export async function fetchCoronaData1(): Promise<any> {
    return new Promise<any>((resolve, reject) => {  
        fetch('/api/corona/data1')
        .then((response) => response.json())        
        .then (data => {
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
            resolve(data.corona);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

export async function updateFavourGraph(chartId: string, isFavour: boolean): Promise<Favour> {
    return new Promise<Favour>((resolve, reject) => {  
        const formData = new FormData();
        formData.append(`chartId`, chartId);
        formData.append(`isFavour`, String(isFavour));

        fetch('/api/graph/favour', {
            method: 'PUT',
            body: formData,
        })
        .then((response) => response.json())        
        .then (data => {
          const resultData: Favour = {
            chartId: data.chartId,
            isFavour: data.isFavour,
          }
          resolve(resultData);
        })
        .catch((err) => {
            reject(err);
        });
    });
}
