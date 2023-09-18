import React from "react";
import Card from "../card/card";
import Pagination from "../pagination/pagination";
import styles from "./cardList.module.css";

const getData = async (page,cat) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?page=${page}&cat=${cat || ""}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export default async function CardList({ page, cat }) {
  const {posts,count} = await getData(page,cat);

  const POST_PER_PAGE = 4;

  const hasPrev = POST_PER_PAGE * (page-1) > 0;
  const hasNext = POST_PER_PAGE * (page-1) + POST_PER_PAGE < count;

  return (
    <div id="posts" className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts?.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
      <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev} />
    </div>
  );
}
