import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import FooterTest from "../components/FooterTest";
import ScrollUpTop from "../components/ScrollUpTop";

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