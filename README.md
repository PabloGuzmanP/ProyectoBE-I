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

   2.1. `http://localhost:8080/api/products/mongo?limit=20&page=2&sort={"field":"price", "sort": "asc"}&query={"category":"Bebidas"}`

   2.2. `http://localhost:8080/api/products/mongo?query={"category":"Frutas"}`
