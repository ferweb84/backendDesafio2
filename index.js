import ProductManager1 from './productManager1.js';

const manager = new ProductManager1();
const operacionesProductos = async () => {
    try {
        let product1 = await manager.addProduct("Boina", "Color Gris", 3500, "Imagen boina", 8, "Boi123")
        console.log(product1)
        let product2 = await manager.addProduct("Boina", "Color Negra", 3700, "Imagen boina", 4, "Boi136")
        console.log(product2)
        let product3 = await manager.addProduct("Boina", "Color Blanca", 3750, "Imagen boina", 5, "Boi138")
        console.log(product3)
        let product4 = await manager.addProduct("Boina", "Color Azul", 3900, "Imagen boina", 10, "Boi136")
        console.log(product4)

         let segundaConsulta = await manager.getProducts();
         console.log(segundaConsulta);

         let productoId= await manager.getProductById(2)
         console.log(productoId);

        let productAct = await manager.updateProduct(2, "Boina");
        console.log(productAct);

        let deleteproduct1 = await manager.deleteProducts(3);
        console.log(deleteproduct1)

    } catch (error) {
        console.log(error);
    }
}
operacionesProductos();