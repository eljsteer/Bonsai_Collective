import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import './App.css'
import Home from './pages/Home';
// import ErrorPage from "./utils/error-page.jsx"

// Pages
import Login from "./pages/Login";
import Bonzai from "./pages/BonzaiTrees";
import Signup from "./pages/Signup";

import RootLayout from "./layouts/RootLayout"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="bonzai" element = {<Bonzai/>} />
      <Route path="login" element = {<Login/>} />
      <Route path="signup" element = {<Signup/>} />
    </Route>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
