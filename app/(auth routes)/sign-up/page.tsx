"use client";

import css from "@/app/(auth routes)/sign-up/SignInPage.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/app/api/api";
import { register, RegisterRequest } from "@/lib/api/api/api";
import { useAuthStore } from "@/lib/store/authStore";
import { User } from "@/lib/api/api/api";
export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (FormData: FormData) => {
    try {
      const formValues = Object.fromEntries(FormData) as RegisterRequest;
      const res = await register(formValues);
      if (res) {
        setUser(res);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error"
      );
    }
  };
  return (
    <>
      <main className={css.mainContent}>
        <h1 className={css.formTitle}>Sign up</h1>
        <form className={css.form} action={handleSubmit}>
          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className={css.input}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className={css.input}
              required
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.submitButton}>
              Register
            </button>
          </div>

          <p className={css.error}>Error</p>
        </form>
      </main>
    </>
  );
}
