import { Link } from "react-router-dom";
import { Button } from "@mui/material";

//// ------ Logged out component ------>>
//// ---------------------------------->>
export default function NotLoggedIn() {
  return (
    <Link to="/login">
      <Button
        className="navLinksBttn"
        sx={{ fontSize:{sm: "0.7rem", md: "0.9rem", lg: "1.1rem"}, fontWeight: "600", color: "black", height:"fit-content"}}>
          LOGIN
      </Button>
    </Link>
  )
}
