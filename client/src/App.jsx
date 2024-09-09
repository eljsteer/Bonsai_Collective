import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"

////------ Theming ------ ////
import theme from "./utils/Theme.jsx"
import { CssBaseline, ThemeProvider } from "@mui/material";

////------ Layouts ------ ////
import RootLayout from "./layouts/RootLayout"

////------ Pages ------////
import ErrorPage from "./utils/error-page.jsx"
import Home from "./pages/Home";
import RequireAuth from "./utils/requireAuth.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfileAccount from "./pages/ProfileAccount.jsx";
import ProfileBonsai from "./pages/ProfileBonsai.jsx";
import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";
import Shop from "./pages/Shop.jsx";
import Explore from "./pages/Explore";
import SingleBonsai from "./pages/SingleBonsai.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import AddBonsai from "./components/AddBonsai.jsx";
import MyBonsai from "./components/MyBonsai.jsx";
import Cart from "./pages/Cart.jsx"
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context'
import { CartContextProvider } from "./utils/cartContext.jsx";
import AddUserInfo from "./pages/AddUserInfo.jsx";

////------ Create HTTP link for graphQL ------>>
const httpLink = createHttpLink({
  uri: "https://bonsai-collective-server.onrender.com/",
});

////------- AuthLink variable to check local storage for token ------>>
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
      <Route path="/adduserinfo" element = {<AddUserInfo />}/>
      <Route path="/profile" element = {<RequireAuth />}>
        <Route index element = {<ProfileAccount />} />
        {/* Nesting MyBonsai and AddBonsai under ProfileBonsai layout */}
        <Route element = {<ProfileBonsai />}>
          <Route path="myBonsai" element = {<MyBonsai />} />
          <Route path="addBonsai" element = {<AddBonsai />} />
        </Route>
      </Route>
      <Route path="/bonsai" element = {<Explore/>} />
      <Route path="/bonsai/:id" element = {<SingleBonsai/>} />
      <Route path="/cart" element = {<Cart/>} />
    </Route>
  )
)

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CartContextProvider>
          <RouterProvider router={router}/>
        </CartContextProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App;
