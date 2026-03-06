import note from "@/models/note";
import DbConnection from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {

//   await DbConnection();

  const { id } = await params;
    console.log("di", id);
    
  try {

    const deletedNote = await note.findByIdAndDelete(id);

    return Response.json({
      success: true,
      deletedNote
    });

  } catch (error) {

    return Response.json({
      success: false,
      error: "Failed to delete note"
    });

  }
}