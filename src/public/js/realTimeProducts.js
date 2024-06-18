const socket = io();
const formProduct = document.getElementById("formulario");
const productsList = document.getElementById("product-list");

socket.on("connect", () => {
    console.log("Conectado al servidor");
    socket.emit("getProducts")
});

socket.on("updateProducts", (products) => {
    productsList.innerHTML = "";
    console.log("Productos actualizados", products);
    products.forEach((product) => {
        const li = document.createElement("li");
        li.textContent = `${product.title} - ${product.description}`;
        productsList.appendChild(li);
    });
});


formProduct.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
        title: formData.get("title"),
        description: formData.get("description"),
        code: formData.get("code"),
        price: Number(formData.get("price")),
        stock: Number(formData.get("stock")),
        category: formData.get("category"),
        thumbnails: formData.get("thumbnails"),
    };

    fetch("/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((response) => {
        formProduct.reset();
        socket.emit("formulario", data);
    })
    .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
    });
});
