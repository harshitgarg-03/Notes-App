import { CreateNoteProp } from "@/next-env";

export const CreateNotes = async (data: CreateNoteProp) => {
    const {Title, Content } = data;
    
    if(!Title || ! Content) {
        console.log("All fields are Required!");
        return;
    }

    const result = await fetch("http://localhost:3000/api/note", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title: Title.trim(), content: Content.trim()})
    })

    const resultsaved = await result.json()
    console.log("result", resultsaved);
    
}