// import express from "express";
// import productsRouter from "./routes/products.router.js";
// import cartsRouter from "./routes/carts.router.js";

const express = require("express");
const productsRouter = require("./routes/products.route.js");
const cartsRouter = require("./routes/carts.route.js")

const PORT = 8080;
const HOST = "localhost";
const server = express();

server.use(express.urlencoded({extended: true}));
server.use(express.json());

server.use("/api/products", productsRouter);
server.use("/api/carts", cartsRouter);

server.listen(PORT, () => {
    console.log(`Se esta ejecutando el servidor http://${HOST}:${PORT}`);
});