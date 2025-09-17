import css from "@/app/notes/action/create/CreateNote.module.css";
import { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "New note",
    description: "Make a new note",

    openGraph: {
      title: "New note",
      description: "Make a new note",
      url: `https://08-zustand-absz.vercel.app/notes/action/create`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub Logo",
        },
      ],
    },
  };
}

export default function CreateNotePage() {
  return (
    <div>
      <main className={css.main}>
        <div className={css.container}>
          <h1 className={css.title}>Create note</h1>
          <NoteForm />
        </div>
      </main>
    </div>
  );
}
