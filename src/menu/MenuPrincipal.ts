import { Estado } from "../enums/Estado";
import { Rol } from "../enums/Rol";
import { Pedido } from "../models/pedido";
import { Producto } from "../models/producto";
import { Usuario } from "../models/Usuario";
import { PedidoService } from "../service/pedidoService";
import { ProductoService } from "../service/productoService";
import { UsuarioService } from "../service/UsuarioService";
import { rl } from "../utils/Readline";

const uService = new UsuarioService();
const prService = new ProductoService();
const peService = new PedidoService();

export async function menuUsuario() {
  let opcion = 6;

  while (true) {
    console.log("|------ MENU ------|");
    console.log("\n1. Agregar");
    console.log("2. Listar");
    console.log("3. Actualizar");
    console.log("4. Eliminar");
    console.log("5. Buscar por id");
    console.log("6. Salir");
    console.log("|------------------|");

    opcion = Number(await rl.question("Dame un nuevo valor para opciones: "));

    if (opcion === 6) {
      break;
    }

    switch (opcion) {
      case 1:
        const id = Number(await rl.question("ID: "));
        const nombre = await rl.question("Nombre: ");
        const apellido = await rl.question("Apellido: ");
        const edad = Number(await rl.question("Edad: "));
        const correo = await rl.question("Correo: ");
        const contrasena = Number(await rl.question("Contraseña: "));
        const rolTexto = await rl.question("Rol (ADMIN | USUARIO): ");
        const estadoTexto = await rl.question(
          "Estado (ACTIVO | INACTIVO | SUSPENDIDO): ",
        );

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

        break;

      case 2:
        console.table(await uService.listar());
        break;
      case 3:
        const idAc = Number(await rl.question("ID: "));
        const nombreAc = await rl.question("Nombre: ");
        const apellidoAc = await rl.question("Apellido: ");
        const edadAc = Number(await rl.question("Edad: "));
        const correoAc = await rl.question("Correo: ");
        const contrasenaAc = Number(await rl.question("Contraseña: "));
        const rolTextoAc = await rl.question("Rol (ADMIN | USUARIO): ");
        const estadoTextoAc = await rl.question("Estado (ACTIVO | INACTIVO | SUSPENDIDO): ");

        const usuarioActualizado: Usuario = {
            id: idAc,
            nombre: nombreAc,
            apellido: apellidoAc,
            edad: edadAc,
            correo: correoAc,
            contrasena: contrasenaAc,
            rol: rolTextoAc.toUpperCase() as Rol,
            estado: estadoTextoAc.toUpperCase() as Estado
        }

        await uService.actualizar(usuarioActualizado);
        break;
      case 4:
        const idEliminar = Number(
          await rl.question("Id del usuario a eliminar. "),
        );
        await uService.eliminar(idEliminar);
        console.log("Usuario eliminado exitosamente!");
        break;
      case 5:
        const idBuscado = Number(
          await rl.question("Id del usuario a encontrar: "),
        );
        await uService.buscarPorId(idBuscado);
        break;
      case 6:
        console.log("Saliendo del programa...");
        rl.close();
        break;

      default:
        console.log("Opción invalida. Intentelo nuevamente.");
        break;
    }
  }
}

export async function menuPedido() {

let opcion = 6;

  while (true) {
    console.log("\n|------ MENU PEDIDO ------|");
    console.log("1. Agregar");
    console.log("2. Listar");
    console.log("3. Actualizar");
    console.log("4. Eliminar");
    console.log("5. Buscar por id");
    console.log("6. Salir");
    console.log("|-------------------------|");

    opcion = Number(await rl.question("Dame un nuevo valor para opciones: "));

    if (opcion === 6) {
      break;
    }

    switch (opcion) {
      case 1:
        const id = Number(await rl.question("ID: "));
        const usuarioId = Number(await rl.question("ID Usuario: "));
        const productoId = Number(await rl.question("ID Producto: "));
        const cantidad = Number(await rl.question("Cantidad: "));
        const total = Number(await rl.question("Total: "));
        const fecha = await rl.question("Fecha (YYYY-MM-DD): ");
        const estadoTexto = await rl.question(
          "Estado (PENDIENTE | COMPLETADO | CANCELADO): "
        );

        await peService.agregar({
          id,
          usuarioId,
          productoId,
          cantidad,
          total,
          fecha,
          estado: estadoTexto.toUpperCase() as "PENDIENTE" | "COMPLETADO" | "CANCELADO",
        });
        break;

      case 2:
        console.table(await peService.listar());
        break;

      case 3:
        const idAc = Number(await rl.question("ID: "));
        const usuarioIdAc = Number(await rl.question("ID Usuario: "));
        const productoIdAc = Number(await rl.question("ID Producto: "));
        const cantidadAc = Number(await rl.question("Cantidad: "));
        const totalAc = Number(await rl.question("Total: "));
        const fechaAc = await rl.question("Fecha (YYYY-MM-DD): ");
        const estadoTextoAc = await rl.question(
          "Estado (PENDIENTE | COMPLETADO | CANCELADO): "
        );

        const pedidoActualizado: Pedido = {
          id: idAc,
          usuarioId: usuarioIdAc,
          productoId: productoIdAc,
          cantidad: cantidadAc,
          total: totalAc,
          fecha: fechaAc,
          estado: estadoTextoAc.toUpperCase() as "PENDIENTE" | "COMPLETADO" | "CANCELADO",
        };

        await peService.actualizar(pedidoActualizado);
        break;

      case 4:
        const idEliminar = Number(
          await rl.question("Id del pedido a eliminar: ")
        );
        await peService.eliminar(idEliminar);
        console.log("Pedido eliminado exitosamente!");
        break;

      case 5:
        const idBuscado = Number(
          await rl.question("Id del pedido a encontrar: ")
        );
        await peService.buscarPorId(idBuscado);
        break;

      default:
        console.log("Opción invalida. Intentelo nuevamente.");
        break;
    }
  }
}

export async function menuProducto() {
let opcion = 6;

  while (true) {
    console.log("\n|------ MENU PRODUCTO ------|");
    console.log("1. Agregar");
    console.log("2. Listar");
    console.log("3. Actualizar");
    console.log("4. Eliminar");
    console.log("5. Buscar por id");
    console.log("6. Salir");
    console.log("|---------------------------|");

    opcion = Number(await rl.question("Dame un nuevo valor para opciones: "));

    if (opcion === 6) {
      break;
    }

    switch (opcion) {
      case 1:
        const id = Number(await rl.question("ID: "));
        const nombre = await rl.question("Nombre: ");
        const marca = await rl.question("Marca: ");
        const categoria = await rl.question("Categoría: ");
        const precio = Number(await rl.question("Precio: "));
        const stock = Number(await rl.question("Stock: "));

        await prService.agregar({
          id,
          nombre,
          marca,
          categoria,
          precio,
          stock,
        });
        break;

      case 2:
        console.table(await prService.listar());
        break;

      case 3:
        const idAc = Number(await rl.question("ID: "));
        const nombreAc = await rl.question("Nombre: ");
        const marcaAc = await rl.question("Marca: ");
        const categoriaAc = await rl.question("Categoría: ");
        const precioAc = Number(await rl.question("Precio: "));
        const stockAc = Number(await rl.question("Stock: "));

        const productoActualizado: Producto = {
          id: idAc,
          nombre: nombreAc,
          marca: marcaAc,
          categoria: categoriaAc,
          precio: precioAc,
          stock: stockAc,
        };

        await prService.actualizar(productoActualizado);
        break;

      case 4:
        const idEliminar = Number(
          await rl.question("Id del producto a eliminar: "),
        );
        await prService.eliminar(idEliminar);
        console.log("Producto eliminado exitosamente!");
        break;

      case 5:
        const idBuscado = Number(
          await rl.question("Id del producto a encontrar: "),
        );
        await prService.buscarPorId(idBuscado);
        break;

      default:
        console.log("Opción invalida. Intentelo nuevamente.");
        break;
    }
  }
}


export async function menuPrincipal() {

  let opcion = 4;

  while (true) {
    console.log("\n|=== MENÚ PRINCIPAL ===|");
    console.log("1. Gestión de Usuarios");
    console.log("2. Gestión de Productos");
    console.log("3. Gestión de Pedidos");
    console.log("4. Salir");
    console.log("|----------------------|");

    opcion = Number(await rl.question("Seleccione una opción: "));

    if (opcion === 4) {
      break;
    }

    switch (opcion) {
      case 1:
        await menuUsuario();
        break;
      case 2:
        await menuProducto();
        break;
      case 3:
        await menuPedido();
        break;
      default:
        console.log("Opción inválida. Inténtelo nuevamente.");
        break;
    }
  }
}