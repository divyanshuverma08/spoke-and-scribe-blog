import CardList from "../components/cardList/cardList";
import CategoryList from "../components/categoryList/categoryList";
import Featured from "../components/featured/featured";
import Menu from "../components/menu/menu";
import styles from "./homepage.module.css";

export default function Home({searchParams}) {
  const page = parseInt(searchParams.page) || 1;
  return (
    <div className={styles.container}>
      <Featured />
      <CategoryList />
      <div className={styles.content}>
        <CardList page={page} />
        <Menu />
      </div>
    </div>
  );
}
