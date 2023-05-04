"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_oas_generator_1 = require("express-oas-generator");
var dotenv_1 = require("dotenv");
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
dotenv_1.default.config();
var app = (0, express_1.default)();
express_oas_generator_1.default.init(app, {});
var port = process.env.PORT;
app.get("/", function (req, res) {
    res.send("Express + TypeScript Server. This is cool 😬");
});
app.get("/users", function (req, res) {
    prisma.users.findMany({}).then(function (users) {
        var html = "<ul>";
        for (var i = 0; i < users.length; i++) {
            html += "<li>Username ".concat(users[i].username, " has a password of \"").concat(users[i].userpassword, "\".</li>");
        }
        html += "</ul>";
        res.send(html);
    });
});
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(port, "\u26A1\uFE0F"));
});
