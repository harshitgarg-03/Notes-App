export const deletenotes = async(id) => {
    
    try {
        const res = await fetch(`http://localhost:3000/api/note/${id}`, {
            method:"DELETE"
        })
        const data = await res.json();
    return data;
    } catch (error) {
        console.log("error");
    }
}