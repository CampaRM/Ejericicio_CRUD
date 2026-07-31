import { createServer } from "http";
import { routes } from "../router/UsuarioRouter";
import { routes as pedidoRouter } from "../router/pedidoRouter";
import { routes as productoRouter} from "../router/productoRouter";

const servidor = createServer(async (req, res) => {
    const url = req.url ?? "";

    if (url.startsWith("/usuarios")) {
        await routes(req, res);
        return;
    }

        if (url.startsWith("/productos")) {
        await productoRouter(req, res);
        return;
    }

        if (url.startsWith("/pedidos")) {
        await pedidoRouter(req, res);
        return;
    }
    
});

servidor.listen(3000, () => {
    console.log("----------------------");
    console.log("Servidor iniciado en:");
    console.log("http://localhost:3000");
    console.log("----------------------");
});