console.log("Hola soy el cliente");

const socket = io();

socket.on("connect", () => {
    console.log("Conectado al server");
});