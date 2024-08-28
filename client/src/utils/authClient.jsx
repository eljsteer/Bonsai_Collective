////-------------------------------------------////
////------ User Authentication Functions ------////
////-------------------------------------------////

////------ Used to decode a token and retrieve the  user"s information ------>>
import { jwtDecode } from "jwt-decode";

////------ create a new class to instantiate the user ------>>
class AuthService {
////------ Returns token to pass to headers when user accesses their profile ------>>
  getProfile() {
    const token = jwtDecode(this.getToken());
    console.log("Adding Token to Headers", token);
    return token;
  }

////------ Checks if user is logged in, if there is an existing valid tokem ------>>
  loggedIn() {
    const token = this.getToken();
    if (!token) {
      return false;
    }

//// ------- clears the token and redirects to home, if token is expired ------>>
    const isExpired = this.isTokenExpired(token);
    if (isExpired) {
      this.logout(); 
      return false;
    }
    return true;
  }

////------ Checks if token is expired ------->>
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

////------ Returns the user token from localStorage ------>>
  getToken() {
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

////------ After logging in, Saves user token to localstorage ------>>
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

////------ Saves token for logged in user to localstorage ------>>
  signup(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.replace("/profile");
  }

////------ Clear user token and profile data from localStorage ------>>
  logout() {
    localStorage.removeItem("id_token");
    console.log("Logged Out")
    // Reload the page and navigates to homePage
    window.location.assign("/");
  }
}

export default new AuthService();