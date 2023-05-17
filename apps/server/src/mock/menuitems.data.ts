export const mockData = [
  {
    id: 1,
    name: "Appetizers",
    menuItems: [
      { id: 1, name: "Loaded Nachos", price: "10" },
      { id: 2, name: "Vegetable Spring Rolls", price: "10" },
      { id: 3, name: "Tomato Bruschetta", price: "12" },
    ],
    childCategories: [],
  },
  {
    id: 2,
    name: "Soups/Salads",
    menuItems: [
      { id: 4, name: "Creamy Tomato Soup", price: "9" },
      { id: 5, name: "Classic Caesar Salad", price: "8" },
      { id: 6, name: "Miso Soup", price: "9" },
    ],
    childCategories: [],
  },
  {
    id: 3,
    name: "Entrees/Main",
    menuItems: [
      { id: 7, name: "Grilled Salmon", price: "15" },
      { id: 8, name: "Beef Stew", price: "20" },
      { id: 9, name: "Vegetable Curry", price: "15" },
    ],
    childCategories: [],
  },
  {
    id: 4,
    name: "Pasta/Noodles",
    menuItems: [
      { id: 10, name: "Spaghetti Carbonara", price: "11" },
      { id: 11, name: "Pad Thai", price: "14" },
      { id: 12, name: "Vegetable Lasagna", price: "13" },
    ],
    childCategories: [],
  },
  {
    id: 5,
    name: "Seafood",
    menuItems: [
      { id: 13, name: "Grilled Halibut", price: "17" },
      { id: 14, name: "Shrimp Scampi", price: "14" },
      { id: 15, name: "Fish Tacos", price: "14" },
    ],
    childCategories: [],
  },
  {
    id: 6,
    name: "Beef/Pork",
    menuItems: [
      { id: 16, name: "Filet Mignon", price: "25" },
      { id: 17, name: "BBQ Pork Ribs", price: "21" },
      { id: 18, name: "Sautéed Beef and Broccoli", price: "23" },
    ],
    childCategories: [],
  },
  {
    id: 7,
    name: "Vegetarian/Vegan",
    menuItems: [
      { id: 19, name: "Vegetable Stir-Fry", price: "14" },
      { id: 20, name: "Lentil Curry", price: "13" },
    ],
    childCategories: [],
  },
  {
    id: 8,
    name: "Desserts",
    menuItems: [
      { id: 21, name: "Creme Brulee", price: "12" },
      { id: 22, name: "Apple Pie", price: "6" },
      { id: 23, name: "Chocolate Lava Cake", price: "10" },
      { id: 24, name: "Tiramisu", price: "5" },
    ],
    childCategories: [],
  },
  {
    id: 9,
    name: "kidsMenu",
    menuItems: [
      { id: 25, name: "Pizza Margarita", price: "6" },
      { id: 26, name: "Pizza capricciosa", price: "10" },
      { id: 27, name: "French fries", price: "5" },
      { id: 28, name: "Chiken fingers", price: "6" },
    ],
    childCategories: [],
  },
  {
    id: 10,
    name: "Beverages",
    menuItems: [],
    childCategories: [
      {
        id: 11,
        name: "nonAlcoholic",
        menuItems: [
          { id: 29, name: "Coca-Cola", price: "3" },
          { id: 30, name: "Fanta", price: "3" },
          { id: 31, name: "Sprite", price: "3" },
          { id: 32, name: "Dr.Pepper", price: "3" },
          { id: 33, name: "Orange Juice", price: "3" },
          { id: 34, name: "Fresh", price: "5" },
          { id: 35, name: "Apple Juice", price: "3" },
          { id: 36, name: "Cranberry Juice", price: "3" },
          { id: 37, name: "Espresso", price: "2" },
          { id: 38, name: "macchiato", price: "3" },
          { id: 39, name: "late macchiato", price: "4" },
          { id: 40, name: "Cappuccino", price: "3" },
          { id: 41, name: "Mocha", price: "4" },
          { id: 42, name: "Cold Brew", price: "3" },
        ],
        childCategories: [],
      },
      {
        id: 12,
        name: "alcoholic",
        menuItems: [
          { id: 43, name: "Margarita", price: "5" },
          { id: 44, name: "Mojito", price: "5" },
          { id: 45, name: "Old Fashioned", price: "6" },
          { id: 46, name: "Cosmopolitan", price: "6" },
          { id: 47, name: "Daiquiri", price: "6" },
          { id: 48, name: "Manhattan", price: "6" },
        ],
        childCategories: [],
      },
    ],
  },
];
