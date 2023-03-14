import fs from "fs";
import express, { json } from "express";
import ProductManager from "./ProductManager.js";


const productmanager = new ProductManager();
export default class CartManager {
    constructor() {
        this.cart = [];
     
        this.path = "./src/public/files/Cart.json";
    }
    getCart = async () => {
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
    createCart = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const result = JSON.parse(data);
                const otherCart = { id: result.length + 1, products: [] }
                result.push(otherCart)
                await fs.promises.writeFile(this.path, JSON.stringify(result, null, "\t"));
                return `Carrito creado`;
            } else {

                const newCart = { id: this.cart.length + 1, products: [] }
                this.cart.push(newCart);
                await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, "\t"));
                return `Carrito creado2`

            }
        } catch (error) {
            console.error(`Error to read the file ${this.path} ${error}`);
            return [];
        }
    }
    addProducttoCart = async (cId, idProd) => {
        try {
            const products = await productmanager.getProducts();
            let cart = await this.getCart();

            const productExistsIncart = cart.find((cartprod) => cartprod.id === cId)

            // if(typeof cId !="number" || typeof idProd)

            if (!productExistsIncart) {
                return `El carrito solicitado no existe`;
            } else {
                let indexValue = products.find((event) => event.id === idProd);
                // console.log(indexValue.id)
                // console.log(productExistsIncart.products)
                const resultado = productExistsIncart.products.find((prod) => prod.id === idProd)

                if (!resultado) {

                    let cantidad = 0
                    const productAdding = {
                        id: indexValue.id, quantity: cantidad 
                    }

                    productExistsIncart.products.push(productAdding);


                    // cart.push(productExistsIncart)
                    await fs.promises.writeFile(this.path, JSON.stringify(cart, null, "\t"));
                    return `Producto agregado al carrito`;


                } else {
                    console.log(resultado.quantity)
                    const prodQuantitymodified = { id: resultado.id, "quantity": resultado.quantity + 1 }
                    console.log(productExistsIncart.products.length)
                    productExistsIncart.products[productExistsIncart.products.length-1]=prodQuantitymodified
                    await fs.promises.writeFile(this.path, JSON.stringify(cart, null, "\t"));
                    return `Cantidad modificada`;

             
                   
                }
            }




            // let existCart = cart.find((event) => event. === productToAdd.id);
            // if(!existCart){
            //     carritoProd=[];
            //     {}
            //     ={id:id,products:};
            // }else{
            //     return 2;
            // }
        } catch (error) {
            console.log(error)
        }
    }

    getCartById = async (id) => {

        try {
            if (fs.existsSync(this.path)) {
                const result = await this.getCart();

                let indexValue = result.find((event) => event.id === id);
                console.log(indexValue)
                return indexValue;

            }
        } catch (error) {
            console.log(error);
        }



    }
}
