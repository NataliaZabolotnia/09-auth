"use client";

import { useEffect, useState } from "react";
import css from "./TagsMenu.module.css";
import Link from "next/link";
import { getTagsClient } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

// interface TagsMenuProps {
//   tags: string[];
// }

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    if (isAuthenticated) {
      getTagsClient().then((data) => setTags(data));
    }
  }, [isAuthenticated]);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggle}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href="/notes/filter/All"
              onClick={toggle}
              className={css.menuLink}
            >
              All
            </Link>
          </li>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                onClick={toggle}
                className={css.menuLink}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
