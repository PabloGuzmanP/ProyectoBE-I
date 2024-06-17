import { Server } from "socket.io";
import products from "../product.js"


const config = (serverHTTP) => {
    const serverSocket = new Server(serverHTTP);

    serverSocket.on("connection", (socket) => {
        console.log("Cliente conectado!");

        products.getProducts().then(productList => {
            socket.emit("updateProducts", productList);
        });
        
    });

    return serverSocket;
};

export default { config };