document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', async (event) => {
            const productId = event.target.getAttribute('data-product-id');
            const cartSelect = document.getElementById(`cartSelect-${productId}`);
            const cartId = cartSelect.value;

            if (!cartId) {
                alert('Por favor, selecciona un carrito.');
                return;
            }

            const quantity = 1; // O permite al usuario especificar la cantidad

            try {
                const response = await fetch(`/api/carts/${cartId}/addProduct`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productId, quantity }),
                });

                if (!response.ok) {
                    throw new Error('Error al agregar el producto al carrito');
                }

                const result = await response.json();
                console.log('Producto agregado al carrito:', result);
                // Opcional: Actualiza la interfaz de usuario o notifica al usuario
            } catch (error) {
                console.error('Error al agregar el producto al carrito:', error);
            }
        });
    });
});
