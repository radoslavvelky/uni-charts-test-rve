import { NextRequest, NextResponse } from "next/server";

// Define the GET handler 
export const GET = async (req: NextRequest, res: NextResponse) => {

  const headers = {       
    "Content-Type": "application/json",
    //"Access-Control-Allow-Methods": "GET, OPTIONS",
    //"Access-Control-Allow-Origin": "*",
  }        

  try {
      const response = await fetch('https://api.ukhsa-dashboard.data.gov.uk/themes/infectious_disease/sub_themes/respiratory/topics/COVID-19/geography_types/Nation/geographies/England/metrics/COVID-19_testing_PCRcountByDay', {headers: headers});
      console.log("corona response: ", response);
      const data = await response.json();
      console.log("corona body: ", data);
      return NextResponse.json({ Message: "Success", status: 200, corona: data.results});
  } catch (err) {
    console.log("corona fetch data error: ", err);
    return NextResponse.json({ Message: "Failed API Corona 2", status: 500, error: err});
  };

};