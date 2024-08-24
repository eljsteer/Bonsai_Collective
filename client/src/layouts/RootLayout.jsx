import { Outlet } from "react-router-dom";
// ------ Component Imports ------>>
import Header from "../components/AppAndHomePage/Header";
import Footer from "../components/AppAndHomePage/Footer";
import ScrollUpTop from "../components/AppAndHomePage/ScrollUpTop";
// ------ CSS Stylesheets ------>>
import "../styles/RootLayout.css"


//// ------ Layout structure of website at root level ------>>
//// ------------------------------------------------------->>
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