"use client";
import { useState } from "react";
import css from "@/app/notes/filter/[...slug]/NotesPage.module.css";
import "modern-normalize/modern-normalize.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "@/components/Pagination/Pagination";

import { useDebouncedCallback } from "use-debounce";
import StatusWrapper from "@/components/StatusWrapper/StatusWrapper";
import Link from "next/link";
interface NotesProps {
  initialPage: number;
  initialQuery: string;
  tag?: string;
}

export default function Notes({ initialPage, initialQuery, tag }: NotesProps) {
  const [searchText, setSearchText] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const [inputValue, setInputValue] = useState(initialQuery);
  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", currentPage, searchText, tag],
    queryFn: () => fetchNotes(currentPage, searchText, tag),
    // placeholderData: keepPreviousData,
  });

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    updateSearchQuery(value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onChange={handleSearchChange} />
        {data && !isLoading && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        <button className={css.button}>
          <Link href="/notes/action/create">Create note +</Link>
        </button>
      </header>
      <h2 className={css.title}>
        {tag ? `Notes tagged: ${tag}` : "All notes"}
      </h2>

      <StatusWrapper
        isLoading={isLoading}
        isError={!!error}
        isEmpty={!isLoading && data?.notes.length === 0}
        error={error}
      >
        <NoteList notes={data?.notes ?? []} />
      </StatusWrapper>
    </div>
  );
}
