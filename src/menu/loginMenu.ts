import { Estado } from "../enums/Estado";
import { Rol } from "../enums/Rol";
import { UsuarioService } from "../service/UsuarioService";
import { rl } from "../utils/Readline";
import { menuPrincipal } from "./MenuPrincipal";

const uService = new UsuarioService();

export async function loginMenu() {
  let opcion: number = 3;
  while (true) {
    console.log(" |------- Login -------|");
    console.log("1. Iniciar sesion");
    console.log("2. Registrarse");
    console.log("3. Salir");
    console.log("|---------------------|");

    opcion = Number(await rl.question("Dame un nuevo valor para opciones: "));

    if (opcion === 3) {
      break;
    }

    switch (opcion) {
      case 1:
        const correo = await rl.question("Correo: ");
        const contrasena = Number(await rl.question("Contraseña: "));
        const usuarioLogueado = await uService.login(correo, contrasena);

        if (usuarioLogueado) {
          console.log(`\n Bienvenido ${usuarioLogueado.nombre}`);
          await menuPrincipal();
          break;
        } else {
          console.log(
            "Credenciales incorrectas. Intentelo nuevamente mas tarde...",
          );
        }
        break;
      case 2:
        await registrarUsuario();
        break;

      default:
        console.log("Opción no válida.");
        break;
    }
  }
}

async function registrarUsuario() {

  const id = Number(await rl.question("Id: "));
  const nombre = await rl.question("Nombre: ");
  const apellido = await rl.question("Apellido: ");
  const edad = Number(await rl.question("Edad: "));
  const correo = await rl.question("Correo: ");
  const contrasena = Number(await rl.question("Contraseña: "));
  const rolTexto = await rl.question("Rol (ADMIN | USUARIO): ");
  const estadoTexto = await rl.question("Estado (ACTIVO | INACTIVO | SUSPENDIDO): ");

  await uService.agregar({
    id,
    nombre,
    apellido,
    edad,
    correo,
    contrasena,
    rol: rolTexto.toUpperCase() as Rol,
    estado: estadoTexto.toUpperCase() as Estado,
  });
  
}
