import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const fetchPasswords = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      password: true,
    },
  });
};

fetchPasswords().then((res) => {
  console.log(res);
});
