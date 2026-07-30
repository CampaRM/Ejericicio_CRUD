import { IncomingMessage, ServerResponse } from "http";
import { url } from "inspector";
import { PedidoService } from "../service/pedidoService";


const service = new PedidoService();

export async function routes(req: IncomingMessage, res: ServerResponse) {

    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const metodo = req.method ?? "";

    try {

        // GET | Listar pedidos
        if (metodo === "GET" && url === "/pedidos") {

            const pedidos = await service.listar();

            res.writeHead(200);

            res.end(JSON.stringify(pedidos));

            return;
        }

        // POST | Agregar pedidos
        if (metodo === "POST" && url === "/pedidos/crear") {
            let body = "";

            req.on("data", chunk => {
                body += chunk;
            });

            req.on("end", async () => {
                try {
                    
                    const pedido = JSON.parse(body);

                    await service.agregar(pedido);

                    res.writeHead(201);

                    res.end(JSON.stringify({
                        mensaje: "Pedido agregado correctamete."
                    }));

                } catch (error) {
                    
                    res.writeHead(400);

                    res.end(JSON.stringify({
                        mensaje: (error as Error).message
                    }));
                }
            })
        }

        // PUT | Actualizar pedidos

        // DELETE | Eliminar pedidos
        
    } catch (error) {
        res.writeHead(500);

        res.end(JSON.stringify({
            mensaje: (error as Error).message
        }));
        
    }
}