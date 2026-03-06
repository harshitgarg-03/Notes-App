import { GetnoteProp } from "@/next-env";
import { NextResponse } from "next/server";

export const GetNotes = async () : Promise<GetnoteProp[]> => {
  try {
    const result = await fetch("http://localhost:3000/api/note", {
      method: "GET",
    });
    const data = await result.json();
    console.log("data data ", data.data);
    return data.data;
  } catch (error) {
    console.log("failed to fetch notes");
    throw error;
  }
};
