// >>------------------------>>
// Authentication Code Functions
// >>------------------------>>

// Used to decode a token and retrieve the  user"s information
import { jwtDecode } from "jwt-decode";

// create a new class to instantiate the user
class AuthService {
  // get user data
  getProfile() {
    const token = this.getToken();
    const decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken);
    return decodedToken;
  }
  // check if user"s logged in
  loggedIn() {
    // Checks if there is a saved token and it"s still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    const token = localStorage.getItem("id_token");
    console.log("Retrieved Token:", token);
    return token;
  }

  // refreshToken = async () => {
  //   try {
  //     const response = await fetch('/path/to/refresh', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ refreshToken: yourRefreshToken }),
  //     });
  
  //     const data = await response.json();
  //     if (data.token) {
  //       localStorage.setItem('id_token', data.token);
  //     } else {
  //       // Handle error, redirect to login, etc.
  //     }
  //   } catch (error) {
  //     console.error("Error refreshing token:", error);
  //     // Redirect to login or handle error
  //   }
  // }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  signup(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
    window.location.replace("/profile");
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    console.log("Logged Out")
    // this will reload the page and reset the state of the application
    window.location.assign("/");
  }
}

export default new AuthService();