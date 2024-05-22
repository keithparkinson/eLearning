// import { useState } from "react";
import { useForm } from "react-hook-form";

import styles from "../components/LoginPage.module.css";
import { useLogin } from "../services/useLogin";
export default function LoginPage() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "keithparkinson2018@outlook.com",
      password: "Cronaldo101",
    },
  });

  const { isLoading, login } = useLogin();

  function onSubmit(data) {
    console.log(data);

    login(data);
  }

  if (isLoading) {
    <span>loading...</span>;
  }

  return (
    <form className={styles.login} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.brand}>K</p>
          <p className={styles.brand}>Company</p>
        </div>

        <div className={styles.textbox}>
          <input
            type="text"
            className={styles.box}
            placeholder="Username"
            // value={email}
            id="email"
            {...register("email")}
          />
          <input
            type="text"
            id="password"
            className={styles.box}
            placeholder="Password"
            // value={password}
            {...register("password")}
          />
        </div>

        <a className={styles.links}>Reset Password</a>
        <button className={styles.btn}>Login</button>
      </div>
    </form>
  );
}
