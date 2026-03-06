"use client";

import { useEffect, useState } from "react";
import { CreateNotes } from "./methods/createNote";
import { GetNotes } from "./methods/getNote";
import { GetnoteProp } from "@/next-env";
import { deletenotes } from "./methods/deleetnotes";

export default function Home() {
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [GetNoteFromBackend, setGetNoteFromBackend] = useState<GetnoteProp[]>(
    [],
  );

  const data = { Title, Content };

  const fetchNotes = async () => {
    const res = await GetNotes();
    setGetNoteFromBackend(res);
  };

  async function HandleButton() {
    await CreateNotes(data);

    setTitle("");
    setContent("");

    fetchNotes();
  }

  const deletenot = async (id: string) => {
    await deletenotes(id)
    
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center p-6 gap-8">
      {/* Create Note Card */}
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Notes App
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Note Title"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Describe the content..."
            value={Content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={HandleButton}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Note
          </button>
        </div>
      </div>

      {/* Notes List */}
      <div className="w-full max-w-lg space-y-4">
        {GetNoteFromBackend.length === 0 ? (
          <p className="text-gray-500 text-center">No notes yet</p>
        ) : (
          GetNoteFromBackend.map((note) => (
            <div key={note._id} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="font-semibold text-lg">{note.title}</h3>
              <p className="text-gray-600">{note.content}</p>

              <div className="flex gap-3 mt-3">
                <button className="px-4 py-1.5 text-sm font-medium bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition">
                  Edit
                </button>

                <button className="px-4 py-1.5 text-sm font-medium bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                onClick={() => deletenot(note._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
