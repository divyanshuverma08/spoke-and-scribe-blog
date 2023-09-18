import React from "react";
import styles from "./menu.module.css";
import MenuPost from "../menuPost/menuPost";
import MenuCategories from "../menuCategories/menuCategories";

export default function Menu() {
  return (
    <div className={styles.container}>
      <h2 className={styles.subTitle}>{"What's hot"}</h2>
      <h1 className={styles.title}>Most Popular</h1>
      <MenuPost image={false} />
      <h2 className={styles.subTitle}>Discover by topic</h2>
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories />
      <h2 className={styles.subTitle}>Chosen by the editor</h2>
      <h1 className={styles.title}>Editors pick</h1>
      <MenuPost image={true} />
    </div>
  );
}
