import css from "@/app/loading.module.css";

export default function Loading() {
  return (
    <div className={css.loadingContainer}>
      <p>Loading, please wait...</p>
    </div>
  );
}
