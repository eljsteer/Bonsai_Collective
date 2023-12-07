import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"

import theme from "./Theme"

// import { ThemeProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";

////// <<-- Layouts -->> //////
import RootLayout from "./layouts/RootLayout"

////// <<-- Pages -->> //////
import ErrorPage from "./utils/error-page.jsx"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";
import Shop from "./pages/Shop.jsx";
import Explore from "./pages/Explore";
import Signup from "./pages/Signup";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context'

// create HTTP link for graphQL
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

// authLink variable to check local storage for token 
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers, 
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement= {<ErrorPage/>} >
      <Route index element={<Home />} />
      <Route path="login" element = {<Login/>} />
      <Route path="signup" element = {<Signup/>} />
      <Route path="profile" element = {<Profile/>} />
      <Route path="about" element = {<About/>} />
      <Route path="blog" element = {<Blog/>} />
      <Route path="shop" element = {<Shop/>} />
      <Route path="explore" element = {<Explore/>} />
    </Route>
  )
)

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router}/>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
