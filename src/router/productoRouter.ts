import { IncomingMessage, ServerResponse } from "http";
import { url } from "inspector";
import { ProductoService } from "../service/productoService";


const service = new ProductoService();

export async function routes(req: IncomingMessage, res: ServerResponse) {

    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const metodo = req.method ?? "";

    try {

        // GET | Listar productos
        if (metodo === "GET" && url === "/productos") {

            const productos = await service.listar();

            res.writeHead(200);

            res.end(JSON.stringify(productos));

            return;
        }

        // POST | Agregar productos
        if (metodo === "POST" && url === "/productos/crear") {
            let body = "";

            req.on("data", chunk => {
                body += chunk;
            });

            req.on("end", async () => {
                try {
                    
                    const producto = JSON.parse(body);

                    await service.agregar(producto);

                    res.writeHead(201);

                    res.end(JSON.stringify({
                        mensaje: "Producto agregado correctamete."
                    }));

                } catch (error) {
                    
                    res.writeHead(400);

                    res.end(JSON.stringify({
                        mensaje: (error as Error).message
                    }));
                }
            })
        }

        // PUT | Actualizar productos

        // DELETE | Eliminar productos
        
    } catch (error) {
        res.writeHead(500);

        res.end(JSON.stringify({
            mensaje: (error as Error).message
        }));
        
    }
}