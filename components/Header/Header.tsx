import css from "@/components/Header/Header.module.css";
import Link from "next/link";
import TagsMenu from "../TagsMenu/TagsMenu";
import { getTags } from "@/lib/api/serverApi";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation ";

export default async function Header() {
  // const tags = await getTags();
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <TagsMenu />
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}
