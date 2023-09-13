// import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../pages/Home";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <Header/>
      <main>
        <Home/>
      </main>
      <Footer />
    </div>
  )
}