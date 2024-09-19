import { NextRequest, NextResponse } from "next/server";

// Define the GET handler 
export const GET = async (req: NextRequest, res: NextResponse) => {

  const headers = {       
    "Content-Type": "application/json",
    //"Access-Control-Allow-Methods": "GET, OPTIONS",
    //"Access-Control-Allow-Origin": "*",
  }        

  try {
      //all API source  
      //https://api.ukhsa-dashboard.data.gov.uk/themes/infectious_disease/sub_themes/respiratory/topics/COVID-19/geography_types/Nation/geographies/England/metrics
  
      const results = [];
      let maxPages = 10;
      let nextPage = 'https://api.ukhsa-dashboard.data.gov.uk/themes/infectious_disease/sub_themes/respiratory/topics/COVID-19/geography_types/Nation/geographies/England/metrics/COVID-19_healthcare_admissionByDay';

      while (nextPage && nextPage != "" && maxPages > 0) {
        const response = await fetch(nextPage, { headers: headers });
        const data = await response.json();
        results.push(...data.results);
        nextPage = data.next;
        maxPages--;
      }      

      return NextResponse.json({ Message: "Success", status: 200, corona: results});
  } catch (err) {
    console.log("corona fetch data error: ", err);
    return NextResponse.json({ Message: "Failed API Corona 1", status: 500, error: err});
  };

};