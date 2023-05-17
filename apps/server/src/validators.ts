// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export  const validateEmail = (email : any) => {
    if (email && typeof email === "string") return true;
    return false;
};
// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export  const validatePassword = (password : any) => {
    if (password && typeof password === "string") return true;
    return false;
};
