import fs from "fs";
import express from "express";

export default class ProductManager {
    constructor() {
        this.products = [];
        this.path = "./src/public/files/Productos.json";
    }
   // desafios\src\public\files\Productos.json
    productServer = express();
    returnObject = async () => {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const result = JSON.parse(data);
        return result;

    }

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                // valorArchivo= new Blob([data]).size;
                // if(valorArchivo!=0){

                // }
                const result = JSON.parse(data);
                return result;
            } else {
                return [];
            }

        } catch (error) {
            console.error(`Error to read the file ${this.path} ${error}`);
            return [];
        }

    }
    addProduct = async (productObject) => {

        try {

            const products = await this.getProducts();

            if (!productObject.code || !productObject.title || !productObject.description || !productObject.price || !productObject.thumbnail || !productObject.stock || !productObject.category) {
                console.log("All the fields must be completed")
                return;
            }
            
    

            let productRepeated = products.find((element) => element.code === productObject.code);
         
            if (productRepeated) {
                return null;
            
            }
            let status = productObject.stock > 0 ? true : false;
            const product = {
                id: products.length + 1,
                title: productObject.title,
                description: productObject.description,
                code: productObject.code,
                status: status,
                price: productObject.price,
                category: productObject.category,
                thumbnail: productObject.thumbnail,
                stock: productObject.stock

            }


            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
            return `Producto agregado`;
        } catch (error) {
            console.log(error);
        }

    }

    getProductById = async (id) => {

        try {
            if (fs.existsSync(this.path)) {
                const result = await this.getProducts();

                let indexValue = result.find((event) => event.id === id);

                return indexValue;

            }
        } catch (error) {
            console.log(error);
        }



    }
    deleteProducts = async (id) => {
        const products = await this.getProducts()
        let productFounded = products.find((product) => product.id === id)
        if (productFounded) {
            try {
                const valor = products.filter((event) => event.id != id);
                await fs.promises.writeFile(this.path, JSON.stringify(valor, null, "\t"))
                return "Product eliminated";

            } catch (error) {
                console.log(error);
            }

        } else {
            return `The product to delete with the id: ${id} does not exist in the list`
        }
    }
    updateProduct = async (idUpdate,productUpdate) => {
        try {
            const products = await this.getProducts();

            if (products === "error") {
                return "The file is empty";
            }


            let productExists = products.find((product) => product.id === idUpdate)
            if (productExists != undefined) {

                const productoAmodificar = products.filter((product) => product.id === idUpdate);

                const productoModificado = {
                    id: idUpdate,
                    title: productUpdate.title ?? productoAmodificar[0].title,
                    description: productUpdate.description ?? productoAmodificar[0].description,
                    code: productUpdate.code ?? productoAmodificar[0].code,
                    status: productUpdate.status ?? productoAmodificar[0].status,
                    price: productUpdate.price ?? productoAmodificar[0].price,
                    category: productUpdate.category ?? productoAmodificar[0].category,
                    thumbnail: productUpdate.thumbnail ?? productoAmodificar[0].thumbnail,
                    stock: productUpdate.stock ?? productoAmodificar[0].stock

                }

                products[idUpdate - 1] = productoModificado;

                //console.log(this.products)
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
                return `Product updated`;


            } else {
                return null;
            }
        } catch (error) {
            console.log(error)
        }

    }
}




