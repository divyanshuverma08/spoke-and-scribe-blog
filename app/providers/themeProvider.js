"use client";

import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/themeContext";

export default function ThemeProvider({ children }) {
  const { theme } = useContext(ThemeContext);

  return <div className={theme}>{children}</div>;

}
