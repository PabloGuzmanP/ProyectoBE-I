# Instrucciones de Uso

## Ver la lista de Productos

Para ver la lista de los productos agregados actualmente en la lista, sigue estos pasos:

1. **Accede a la siguiente dirección en tu navegador:**

    http://localhost:8080/api/products/

    Esta URL te proporcionará la lista completa de productos disponibles.

2. **Para limitar el número de productos que se muestran en la lista, puedes añadir un parámetro `limit` a la URL. Sustituye `(cantidad de elementos)` por el número deseado de productos que deseas mostrar:**

    http://localhost:8080/api/products/?limit=(cantidad_de_elementos)

3. **Para acceder a la pagina de agregar un producto y eliminarlo, viendolo en una lista que se actualiza, ingresa a la siguiente dirección:**

    http://localhost:8080/realTimeProducts

## Ver la lista de productos (Mongo)

1. **Al momento de ingresar a la siguiente dirección esta solo mostrara un limite de 10 productos que esten en la base de datos.**

    http://localhost:8080/api/products/mongo

2. **Se puede ingresar también por query params lo siguiente: `limit`, `page`, `{"category":""}` y para ordenar por medio de precio `{"field":"price", "order": "asc/desc"}`. Direcciones de ejemplo:**

   2.1. `http://localhost:8080/api/products/mongo?limit=20&page=1&sort={"field":"price","order":"desc"}&query={"category":"Bebidas"}`

   2.2. `http://localhost:8080/api/products/mongo?query={"category":"Frutas"}`

3. **Endpoints del router cart:**
    
    3.1 Metodo GET para obtener todos los carritos.

    http://localhost:8080/api/carts/mongo/get

    3.2 Metodo POST para crear un nuevo carrito.

    http://localhost:8080/api/carts/mongo

    3.3 Metodo POST para poder insertar la cantidad de un producto a un carrito.

    http://localhost:8080/api/carts/mongo/(id_carrito)/product/(id_producto)
    Body:  
    ```
    {
        "quantity": "6"
    }       
    ```

    3.4 Metodo DELETE para eliminar un carrito.

    http://localhost:8080/api/carts/mongo/(id_carrito)

    3.5 Metodo DELETE para eliminar del carrito un producto seleccionado.

    http://localhost:8080/api/carts/mongo/(id_carrito)/products/(id_producto)

    3.6 Método PUT para actualizar el carrito con un arreglo de productos.

    http://localhost:8080/api/carts/mongo/(id_carrito)  
    Body: 
    ```
    {
        "products": [
            {
            "productId": "6685853c5b33ce0bf9ddbcad",
            "quantity": 6
            },
            {
            "productId": "668574e15b33ce0bf9d4d698",
            "quantity": 2
            },
            {
            "productId": "6685853c5b33ce0bf9ddbcb7",
            "quantity": 19
            }
        ]
    }
    ```
    3.7 Metodo PUT para actulizar la cantidad de ejemplares del producto.

    http://localhost:8080/api/carts/mongo/(id_carrito)/products/(id_producto)  
    Body:
    ```
    {
        "quantity": "3"
    }       
    ```

    3.8 Metodo DELETE para eliminar todos los productos del carrito.

    http://localhost:8080/api/carts/mongo/carts/(id_carrito)

    3.9 Metodo GET con POPULATE.

    http://localhost:8080/api/carts/mongo/get/(id_carrito)

4. **Handlebars**