import DbConnection from "@/lib/db";
import Notes from "@/models/note";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    await DbConnection();
    try {
        const body = await request.json();
        
        const note = await Notes.create(body);
        return NextResponse.json({success: true, data: note}, {status: 201});
    } catch (error: any) {
        return NextResponse.json({success: false, error: error.message}, {status: 400});
    }
}
  
export async function GET(request: NextRequest){
    await DbConnection();
    try {
        const note = await Notes.find({}).sort({createdAt: -1}).lean();        
        return NextResponse.json({success: true, data: note}, {status: 201});
    } catch (error: any) {
        return NextResponse.json({success: false, error: error.message}, {status: 400});
    }
}

