"use client";

import React, { useState } from "react";
import styles from "./authLinks.module.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function AuthLinks() {
  const [open,setOpen] = useState(false);

  const {status} = useSession();
  return (
    <div className={styles.container}>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          <Link href="/write" className={styles.link}>
            Write
          </Link>
          <span className={styles.link} onClick={signOut}>
            Logout
          </span>
        </>
      )}
      <div className={styles.burger} onClick={()=>setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link onClick={()=>setOpen(!open)} href="/">
            Homepage
          </Link>
          <Link onClick={()=>setOpen(!open)} href="/">
            Cotact
          </Link>
          <Link onClick={()=>setOpen(!open)} href="/">
            About
          </Link>
          {status === "unauthenticated" ? (
            <Link onClick={()=>setOpen(!open)} href="/login" className={styles.link}>
              Login
            </Link>
          ) : (
            <>
              <Link onClick={()=>setOpen(!open)} href="/write">Write</Link>
              <span className={styles.link} onClick={signOut}>
              Logout
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
