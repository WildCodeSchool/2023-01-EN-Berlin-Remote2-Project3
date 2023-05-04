"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_oas_generator_1 = __importDefault(require("express-oas-generator"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
const app = (0, express_1.default)();
express_oas_generator_1.default.init(app, {});
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4500;
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server. This is amayzing 😬😬");
});
app.get("/users", (req, res) => {
    prisma.users.findMany({}).then((users) => {
        let html = "<ul>";
        for (let i = 0; i < users.length; i++) {
            html += `<li>Username ${users[i].username} has a password of "${users[i].userpassword}".</li>`;
        }
        html += "</ul>";
        res.send(html);
    });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}⚡️`);
});
