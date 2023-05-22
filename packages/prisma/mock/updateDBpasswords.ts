import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { hashedPasswords } from "./hashedpasswords.data";

const updatePasswords = async () => {
  const prismaPromises = hashedPasswords.map((userObject) =>
    prisma.user.update({
      where: { id: userObject.id },
      data: { password: userObject.password },
    })
  );
  return Promise.all(prismaPromises);
};

updatePasswords().then((res) => {
  console.log(res);
});
