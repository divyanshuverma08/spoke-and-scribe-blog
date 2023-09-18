import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";

export default function Featured() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Hey Everyone !!!!! </b>
        This Is My First Blog
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/p1.jpeg" alt="" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
          <p className={styles.postDesc}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum
            quaerat minima officia similique assumenda ratione numquam laborum
            modi ut odio et vero tenetur doloremque esse rem maiores nobis, eos
            nihil!
          </p>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </div>
  );
}
