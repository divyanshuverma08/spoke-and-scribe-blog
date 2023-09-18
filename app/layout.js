import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { Inter } from "next/font/google";
import { ThemeContextProvider } from "./context/themeContext";
import ThemeProvider from "./providers/themeProvider";
import AuthProvider from "./providers/authProvider";
import { cookies } from 'next/headers';

import "./globals.css";

export const revalidate = 0;

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spoke&Scribe Blog",
  description: "Blog Website",
};

export default function RootLayout({ children }) {
  const cookieStore = cookies()
  const initTheme = cookieStore.get('theme')

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeContextProvider initTheme={initTheme?.value || "light"}>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                  <Navbar />
                  {children}
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
