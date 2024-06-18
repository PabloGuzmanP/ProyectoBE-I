import { Server } from "socket.io";
import products from "../product.js"


const config = (serverHTTP) => {
    const serverSocket = new Server(serverHTTP);

    serverSocket.on("connection", async (socket) => {
        console.log("Cliente conectado!");

        socket.on("getProducts", async () => {
            const productList = await products.getProducts();
            socket.emit("updateProducts", productList)
        })

        
        socket.on("formulario", async () => {
            const updatedProducts = await products.getProducts();
            serverSocket.emit("updateProducts", updatedProducts);
        })
        
    });
    return serverSocket;
};

export default { config };