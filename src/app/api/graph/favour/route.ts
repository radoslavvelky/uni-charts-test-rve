import { NextRequest, NextResponse } from "next/server";

//Database Demo Code
//import { PrismaClient } from "@prisma/client";
//const prisma = new PrismaClient();

export const PUT = async (req: NextRequest, res: NextResponse) => {
  // Parse the incoming form data  
  const formData = await req.formData();
  const chartId = formData.get("chartId") as string;
  const isFavour = formData.get("isFavour")  as string === "true";  

  if (!chartId || typeof isFavour !== "boolean") {
    return NextResponse.json({ Message: "Invalid request parameters", status: 400, chartId: chartId});
  }

  try {
    //Database update Demo Code
    /*
    const graphFavour = await prisma.graphFavour.upsert({
      where: { chartId },
      update: { isFavour },
      create: { chartId, isFavour },
    });
    */

    return NextResponse.json({ Message: "Graph favour status updated", status: 200, chartId: chartId, isFavour: isFavour});
  } catch (err) {
    console.error("Error updating graph favour status:", err);
    return NextResponse.json({ Message: "Internal server error", status: 500, chartId: chartId});
  }
};