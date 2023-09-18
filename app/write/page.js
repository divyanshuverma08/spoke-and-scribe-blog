"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./write.module.css";  
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import toast, { Toaster } from 'react-hot-toast';

export default function WritePage() {
  const { status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const uploadImage = async () => {
    if (!file) {
      return null;
    }
    try {
      const data = new FormData();
      data.append("file", file);
      data.append(
        "upload_preset",
        `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
      );
      data.append("folder", "blog");
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "post",
          body: data,
        }
      );

      const image = await res.json();
      return image.url;
    } catch (err) {
      console.log(err);
    }
  };

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    if(process.env.NEXT_PUBLIC_POST_ALLOWED === "false"){
      toast.error('Cannot create post because this is a demo.', {
        style: {
          border: '1px solid #A73121',
          padding: '16px',
          color: '#A73121',
        },
        iconTheme: {
          primary: '#A73121',
          secondary: '#FFFAEE',
        },
      });
      return;
    }
    const toastId = toast.loading('Loading...');
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(
      rawContentState
      // hashtagConfig,
      // directional,
      // customEntityTransform
    );
    const url = await uploadImage();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        shortDesc: value,
        desc: markup,
        img: url,
        slug: slugify(title),
        catSlug: catSlug || "style", //If not selected, choose the general category
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }
    toast.remove(toastId);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className={styles.select}
        onChange={(e) => setCatSlug(e.target.value)}
      >
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select>
      <textarea className={styles.shortDesc} maxLength={140} placeholder="Short Description" value={value} onChange={(e)=>setValue(e.target.value)} />
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setOpen(!open);
              }}
              style={{ display: "none" }}
            />
            <button className={styles.addButton}>
              <label htmlFor="image">
                <Image src="/image.png" alt="" width={16} height={16} />
              </label>
            </button>
            <button className={styles.addButton}>
              <Image src="/external.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src="/video.png" alt="" width={16} height={16} />
            </button>
          </div>
        )}
        {typeof window !== "undefined" &&<Editor
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "fontFamily",
              "list",
              "textAlign",
              "colorPicker",
              "embedded",
              "emoji",
              "remove",
              "history",
            ],
          }}
          className={styles.textArea}
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={setEditorState}
        />}
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
      <Toaster />
    </div>
  );
}
