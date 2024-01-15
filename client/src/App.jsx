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
import ProfileAccount from "./pages/ProfileAccount.jsx";
import ProfileBonzai from "./pages/ProfileBonzai.jsx";
import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";
import Shop from "./pages/Shop.jsx";
import Explore from "./pages/Explore";
import SingleBonzai from "./pages/SingleBonzai.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import AddBonzai from "./components/AddBonzai.jsx";
import MyBonzai from "./components/MyBonzai.jsx";
import Cart from "./pages/Cart.jsx"
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context'
import { CartProvider } from "./utils/CartContext.jsx";

// create HTTP link for graphQL
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

// authLink variable to check local storage for token 
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  console.log("Adding Token to Headers:", token);
  return {
    headers: {
      ...headers, 
      Authorization: token ? `Bearer ${token}` : "",
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
    <Route path="/" element = {<RootLayout />} errorElement= {<ErrorPage/>} >
      <Route index element = {<Home />} />
      <Route path="/login" element = {<Login/>} />
      <Route path="/signup" element = {<Signup/>} />
      <Route path="/about" element = {<About/>} />
      <Route path="/blog" element = {<Blog/>} />
      <Route path="/products" element = {<Shop/>} />
      <Route path="/products/:id" element = {<SingleProduct/>} />
      <Route path="/profile" element = {<RequireAuth />}>
        <Route index element = {<ProfileAccount />} />
        {/* Nesting MyBonzai and AddBonzai under ProfileBonzai layout */}
        <Route element = {<ProfileBonzai />}>
          <Route path="myBonzai" element = {<MyBonzai />} />
          <Route path="addBonzai" element = {<AddBonzai />} />
        </Route>
      </Route>
      <Route path="/bonzai" element = {<Explore/>} />
      <Route path="/bonzai/:id" element = {<SingleBonzai/>} />
      <Route path="/cart" element = {<Cart/>} />
    </Route>
  )
)

function App() {
  return (

      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CartProvider>
            <RouterProvider router={router}/>
          </CartProvider>
        </ThemeProvider>
      </ApolloProvider>

  )
}

export default App
