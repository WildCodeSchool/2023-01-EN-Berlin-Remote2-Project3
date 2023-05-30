export  const validateEmail = (email : unknown) => {
    if (typeof email === "string" && email !== "") return true;
    return false;
};
export  const validatePassword = (password : unknown) => {
    if (typeof password === "string" && password !== "") return true;
    return false;
};
