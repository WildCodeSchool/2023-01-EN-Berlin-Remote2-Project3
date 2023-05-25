// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export  const validateEmail = (email : any) => {
    if (typeof email === "string" && email !== "") return true;
    return false;
};
// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export  const validatePassword = (password : any) => {
    if (typeof password === "string" && password !== "") return true;
    return false;
};
