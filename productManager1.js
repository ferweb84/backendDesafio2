import fs from "fs";

export default class ProductManager1 {
    constructor() {
        this.products = [];
        this.path = "./files/Productos.json";
    }
    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const result = JSON.parse(data);
            return result;
        } else {
            return [];
        }
    }
    addProduct = async (title, description, price, thumbnail, stock, code ) => {
        try {
            if (  !title || !description || !price || !thumbnail || !stock ||!code) {
                console.log("Se deben completar todos los campos requeridos")
                return;
            }
    
            let productRepetido = this.products.find((element) => element.code === code);
            if (productRepetido) {
                return `El codigo ${code} esta repetido, No se puede guardar en la lista`;
                
            }
            const product = {
                
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                stock: stock,
                code: code,
                id: this.products.length + 1
            }
    
    
            this.products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
            return this.products
        } catch (error) {
            console.log(error);
        }
     
    }

    getProductById = async (id) => {
        if (fs.existsSync(this.path)) {
            try {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const result = JSON.parse(data);

                let indexValue = result.find((event) => event.id === id);
                if (!indexValue) {
                   
                    return "El ID de este producto no exite en la lista";
                } else {

                    return indexValue;
                }
            } catch (error) {
                console.log(error);
            }

        }

    }
    deleteProducts = async (id) => {
        if (fs.existsSync(this.path)) {
            let productEncontrado = this.products.find((product) => product.id === id)
            if (productEncontrado) {
                try {
                    const valor = this.products.filter((event) => event.id != id);

                    this.products = valor;

                    await fs.promises.writeFile(this.path, JSON.stringify(valor, null, "\t"))
                    return "Producto Eliminado";

                } catch (error) {
                    console.log(error);
                }

            } else {
                return `The producto eliminado con el  id: ${id} no existe en la lista`
            }

        }

    }
    updateProduct = async (id, title, description, price, thumbnail, stock, code) => {
        let productExists = this.products.find((product) => product.id === id)
        if (productExists) {
            try {
                const productoAmodificar = this.products.filter((product) => product.id === id);

                const prod = {
                   
                    title: title ?? productoAmodificar[0].title,
                    description: description ?? productoAmodificar[0].description,
                    price: price ?? productoAmodificar[0].price,
                    thumbnail: thumbnail ?? productoAmodificar[0].thumbnail,
                    stock: stock ?? productoAmodificar[0].stock,
                    code: code ?? productoAmodificar[0].code,
                    id: id
                }

                this.products[id - 1] = prod;

                //console.log(this.products)
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
                return "Producto actualizado";
            } catch (error) {
                console.log(error)
            }

        } else {
            return `El producto actualizado con el  id ${id} ya no existe en la lista`;
        }


    }
}