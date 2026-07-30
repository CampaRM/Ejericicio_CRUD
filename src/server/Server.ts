import { createServer } from "http";
import { routes } from "../router/UsuarioRouter";

const servidor = createServer(async (req, res) => {
    const url = req.url ?? "";

    if (url.startsWith("/usuarios")) {
        await routes(req, res);
        return;
    }
    
});

servidor.listen(3000, () => {
    console.log("----------------------");
    console.log("Servidor iniciado en:");
    console.log("http://localhost:3000");
    console.log("----------------------");
});