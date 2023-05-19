import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const fetchMenuItems = async () => {
    return await prisma.menuItem.findMany();
}

const fetchCategories = async () => {
    return await prisma.category.findMany({
      include: {
        menuitems:{}
      }
    });
  }

  
  fetchCategories().then(res => {
    res.forEach(category => {
      console.log(category);
    });
  });

// fetchCategories().then(
//     res => { console.log(res) }
// )







