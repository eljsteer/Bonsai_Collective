import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollUpTop from "../components/ScrollUpTop";

// import "../styles/Header.css"

export default function RootLayout() {
  return (
    <div className="root-layout">
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer />
      <ScrollUpTop />
    </div>
  )
}