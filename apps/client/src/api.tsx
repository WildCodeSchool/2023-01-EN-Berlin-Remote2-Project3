import { ResponseGetTablesMine } from "prisma-queries";
import { UserInfo } from "./App";
import ErrorDisplayView from "./components/ErrorDisplayView";
import { TablePhysical } from "@prisma/client";

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
export const fetchTokenValidation = async (token: string) => {
  try {
    const res = await fetch("http://localhost:4000/api/verification", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (data.success === true) return data.payload as UserInfo;
    else return null;
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

export const tableData = async () => {
  try {
    const res = await fetch("http://localhost:4000/api/tables");
    const data: TablePhysical[] = await res.json();
    if (!res.ok) return;

    return data;
  } catch (err) {
    console.log("error happen TableData API");
  }
};

export const fetchMyTables = async (
  token: string
): Promise<ResponseGetTablesMine | undefined> => {
  try {
    const res = await fetch("http://localhost:4000/api/tables/mine", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (err) {
    console.log("error happen fetchMyTables API");
  }
};
