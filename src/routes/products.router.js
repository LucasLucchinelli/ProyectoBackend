import ProductManager from '../ProductManager.js';
import { Router } from "express";

const router = Router();

// router.get("/", (req, res) => {
//     res.send({ pets });
// );
const manager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const consulta = await manager.getProducts();
        let limit = Number.parseInt(req.query.limit)
        console.log(limit);
        
        if (limit) {

            const resultado = consulta.slice(0, limit);
          return  res.send(resultado);
        } 
         
            res.send(consulta
            );
        
    } catch (error) {
        console.log(error)
    }
});

router.get("/:pid", async (req, res) => {
    try {
        let id = req.params.pid
        console.log(id)
        const consultaId = await manager.getProductById(Number.parseInt(id));
        if (!consultaId) {

            return res.send({ error: "El producto con ese id no se encuentra en el archivo" });
        } else {
            res.send(consultaId);
        }
    } catch (error) {
        console.log(error);
    }
});
router.post("/", async (req, res) => {
    try {
        const product = req.body;
        let result = await manager.addProduct(product);
     
        if (result===undefined || result===null) {
            return res.send({ mensaje:"error" });
        } else {
            res.send({
                mensaje: result
            })
        }

        // if (result) {
        //     return res.send({ error: "El producto no se pudo agregar" });
        // }
        // res.send({mensaje:"Producto agregado"});
    } catch (error) {
        console.log(error)
    }
})
router.put("/:pid", async (req, res) => {
    try {
        const product = req.body;
        const id = req.params.pid;
        let result = await manager.updateProduct(Number.parseInt(id), product);
        if (result===null || result === undefined) {
            return res.send({ error: "El producto no se pudo actualizar, el id ingresado no existe" });
        }
        res.send({ mensaje: result });
    } catch (error) {
        console.log(error);
    }
})
router.delete("/:pid", async (req, res) => {
    try {
        const id = req.params.pid;
        let result = await manager.deleteProducts(Number.parseInt(id));

        res.send({
            mensaje: result
        })
    } catch (error) {
        console.log(error);
    }
});
// productServer.listen(8080, () => {
//     try {
//         console.log("Servidor arriba en el puerto 8080");
//     } catch (error) {
//         console.log(error);
//     }
// });
export default router;