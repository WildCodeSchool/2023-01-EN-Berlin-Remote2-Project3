import { passwords } from "./passwords.data";
import * as argon2 from "argon2";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPasswords = async () => {
  const promiseArray = passwords.map((user) =>
    argon2.hash(user.password, hashingOptions)
  );
  return Promise.all(promiseArray).then((res) =>
    passwords.map((user, index) => ({
      id: user.id,
      password: res[index],
    }))
  );
};

hashPasswords().then((res) => {
  console.log(res);
});
