import { jwtDecode } from "jwt-decode";

export const userProfile = (token:string) => {
  let userInfo = {}
    try {
         userInfo = jwtDecode(token);
        
      } catch (error) {
        console.error("Invalid token:", error);
      }
  return userInfo;
}
