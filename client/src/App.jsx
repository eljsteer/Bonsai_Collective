import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import './App.css'

import theme from "./styles/Theme"

// import { ThemeProvider } from '@emotion/react';
import { ThemeProvider } from "@mui/material/styles";

////// <<-- Layouts -->> //////
import RootLayout from "./layouts/RootLayout"

////// <<-- Pages -->> //////
import ErrorPage from "./utils/error-page.jsx"
import Home from './pages/Home';
import Login from "./pages/Login";
import Bonzai from "./pages/BonzaiTrees";
import Signup from "./pages/Signup";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement= {<ErrorPage/>} >
      <Route index element={<Home />} />
      <Route path="bonzai" element = {<Bonzai/>} />
      <Route path="login" element = {<Login/>} />
      <Route path="signup" element = {<Signup/>} />
    </Route>
  )
)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  )
}

export default App
