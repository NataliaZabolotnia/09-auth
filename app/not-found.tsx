import css from "./Home.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404-this page not found",
  description: "404-this page not found",
  openGraph: {
    title: "404-this page not found",
    description: "404-this page not found",
    url: "  https://08-zustand-absz.vercel.app/not-found",
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

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
