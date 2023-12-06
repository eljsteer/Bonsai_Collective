import { Outlet } from "react-router-dom";
import Header from "../components/AppAndHomePage/Header";
import Footer from "../components/AppAndHomePage/Footer";
import ScrollUpTop from "../components/AppAndHomePage/ScrollUpTop";

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