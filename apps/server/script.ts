import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const fetchMenuItems = async () => {
    return await prisma.menuItem.findMany();
}

const fetchCategories = async () => {
    return await prisma.category.findMany();
}

fetchMenuItems().then(
    res => { console.log(res) }
)

fetchCategories().then(
    res => { console.log(res) }
)