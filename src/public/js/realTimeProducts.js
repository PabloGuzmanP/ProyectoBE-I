document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.querySelector('form');
    const productList = document.querySelector('#product-list');

    productForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = new FormData(this);

    const title = formData.get('title');
    const description = formData.get('description');
    const code = formData.get('code');
    const price = formData.get('price');
    const stock = formData.get('stock');
    const category = formData.get('category');
    const thumbnails = formData.get('thumbnails');

    const data = {
        title,
        description,
        code,
        price: Number(price),
        stock: Number(stock),
        category,
        thumbnails
    };

    fetch('/api/products', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        productForm.reset();
    })
    .catch(error => {
        console.error('Error al enviar la solicitud:', error);
    });
    });

    const socket = io();

    socket.on("connect", () => {
        console.log("Conectado al server");
    });

    socket.on("updateProducts", (products) => {
        productList.innerHTML = "";
        products.forEach(product => {
            const li = document.createElement("li");
            li.textContent = `${product.title} - ${product.description}`;
            productList.appendChild(li);
        });
    })
});