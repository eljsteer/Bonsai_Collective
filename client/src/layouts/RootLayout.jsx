import { Outlet } from "react-router-dom";
import Header from "../components/MainApp/Header";
import Footer from "../components/MainApp/Footer";
import ScrollUpTop from "../components/MainApp/ScrollUpTop";
import "../styles/rootLayout.css"


////---------------------------------------------------------------


////-------------------------------------------------------////
////------ Layout structure of website at root level ------////
////-------------------------------------------------------////
export default function RootLayout() {
  return (
    <div className="Root-layout">
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer className="Footer"/>
      <ScrollUpTop />
    </div>
  )
}