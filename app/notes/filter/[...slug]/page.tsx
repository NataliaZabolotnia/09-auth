import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ?? [];
  const tag = slug[0] === "all" ? undefined : slug[0];

  return {
    title: `Notes tagged with "${tag}"`,
    description: `Notes tagged with "${tag}"`,
    openGraph: {
      title: `Notes tagged with "${tag}"`,
      description: `Notes tagged with "${tag}"`,
      url: `https://08-zustand-absz.vercel.app/notes/filter/${tag ?? "all"}`,
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

export default async function NotesPage({ params }: Props) {
  const resParams = await params;
  const slug = resParams.slug ?? [];

  const tag = slug[0] === "all" ? undefined : slug[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes(1, "", tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} initialPage={1} initialQuery="" />
    </HydrationBoundary>
  );
}
