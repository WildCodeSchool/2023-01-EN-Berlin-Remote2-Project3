export const menuData = async () => {
  try {
    const res = await fetch("http://localhost:4000/api/menu");
    const data: Category[] = await res.json();

    if (!res.ok) return;

    return data;
  } catch (err) {
    console.log(err, "something happen :)");
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
    const data: TableInterface[] = await res.json();
    if (!res.ok) return;

    return data;
  } catch (err) {
    console.log("error happen TableData API");
  }
};

export interface TableInterface {
  id: number;
  name: string;
  statusId: number;
}
