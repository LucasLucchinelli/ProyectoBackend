import ProductManager from "../ProductManager.js";
import CartManager from "../CartManager.js";
import { Router } from "express";

const router = Router();

const productmanager= new ProductManager();
const cartmanager= new CartManager();

router.post("/",async(req,res)=>{
    try {
        const cart= await cartmanager.createCart();
        
        if(!cart){
            return res.status(400).send({mensaje: "Error al devolver el carrito"})
        }

        res.status(600).send({mensaje:cart});
    } catch (error) {
        console.log(error)
    }
})

router.get("/:cid",async(req,res)=>{
    try {
        const id= req.params.cid
        console.log(id)
        const cart= await cartmanager.getCartById(Number.parseInt(id));
        
        if(!cart){
            return res.status(400).send({mensaje: "Error al devolver el carrito"})
        }

        res.status(600).send(cart);
    } catch (error) {
        console.log(error)
    }
})

router.post("/:cid/product/:pid",async(req,res)=>{
    try {
        const cid= req.params.cid

        const pid=req.params.pid
      
       
        const cart= await cartmanager.addProducttoCart(Number.parseInt(cid),Number.parseInt(pid));
        
        if(!cart){
            return res.status(400).send({mensaje:cart})
        }

        res.status(600).send(cart);
    } catch (error) {
        console.log(error)
    }
})
export default router;