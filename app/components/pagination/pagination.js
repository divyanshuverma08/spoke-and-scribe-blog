"use client";

import React from "react";
import styles from "./pagination.module.css";
import { useRouter } from "next/navigation";

export default function Pagination({ page, hasPrev, hasNext }) {
  const router = useRouter();

  const handleScroll = () => {
    const targetId = "posts";
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => {
          router.push(`?page=${page - 1}`, { scroll: false });
          handleScroll();
        }}
      >
        Previous
      </button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => {
          router.push(`?page=${page + 1}`, { scroll: false });
          handleScroll();
        }}
      >
        Next
      </button>
    </div>
  );
}
