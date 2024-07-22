document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.delete-products').forEach(button => {
        button.addEventListener('click', async (event) => {
            const cartId = event.target.getAttribute('cart-id');

            try {
                const response = await fetch(`/api/carts/cart/${cartId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if(!response.ok){
                    throw new Error('Error al eliminar los productos del carrito');
                }

                const result = await response.json();
                alert("Productos eliminados del carrito correctamente. Recargar pagina para ver cambios.");
                console.log('Productos eliminados del carrito correctamente', result);
            } catch (error) {
                console.error("Error al eliminar los productos del carrito:", error);
            }
        });
    });
});