import { UserInfo } from "./App";

export const fetchMenuData = async () => {
  try {
    const res = await fetch("http://localhost:4000/api/menu");
    const data: Category[] = await res.json();

    if (!res.ok) return;

    return data;
  } catch (err) {
    console.log(err, "something happen :)");
  }
};

// if the token is valid, this will return the user information
export const fetchTokenValidation = async (token : string) => {
  try {
    const res = await fetch("http://localhost:4000/api/verification", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();
    if (data.success === true)
      return data.payload as UserInfo;
    else
      return null;
  } catch (err) {
    console.log(err, "Token validation failed (Endpoint: /api/validation).");
  }
};

export interface MenuItem {
  id: number;
  name: string;
  price: number;
}

export interface Category {
  id: number;
  name: string;
  menuItems: MenuItem[];
  childCategories: Category[];
}
