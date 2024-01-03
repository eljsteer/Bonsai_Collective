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
import RequireAuth from "./utils/RequireAuth.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";
import Shop from "./pages/Shop.jsx";
import Explore from "./pages/Explore";
import SingleBonzai from "./pages/SingleBonzai.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import AddBonzai from "./components/AddBonzai.jsx";
import MyBonzai from "./components/MyBonzai.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context'

// create HTTP link for graphQL
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

// authLink variable to check local storage for token 
const authLink = setContext((_, { headers }) => {
    // Get the authentication token from local storage or another source
  const token = localStorage.getItem("id_token");
  console.log("Adding Token to Headers:", token);
    // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers, 
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: "include,"
});


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement= {<ErrorPage/>} >
      <Route index element={<Home />} />
      <Route path="/login" element = {<Login/>} />
      <Route path="/signup" element = {<Signup/>} />
      <Route path="/about" element = {<About/>} />
      <Route path="/blog" element = {<Blog/>} />
      <Route path="/products" element = {<Shop/>} />
      <Route path="/products/:id" element = {<SingleProduct/>} />
      <Route path="/profile" element={<RequireAuth />}>
        <Route index element={<Profile />} />
        <Route path="addBonzai" element={<AddBonzai />} />
        <Route path="myBonzai" element={<MyBonzai />} />
      </Route>
      <Route path="/bonzai" element = {<Explore/>} />
      <Route path="/bonzai/:id" element = {<SingleBonzai/>} />
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
