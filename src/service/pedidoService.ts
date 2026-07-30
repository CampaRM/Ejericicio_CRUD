import { PedidoRepository } from "../repository/pedidoRepository";
import { Pedido } from "../models/pedido";

export class PedidoService {
  private repository = new PedidoRepository();

  // Método para listar
  async listar(): Promise<Pedido[]> {
    return await this.repository.obtenerPedidos();
  }

  // Método para agregar
  async agregar(pedido: Pedido): Promise<void> {
    try {
      const pedidos = await this.repository.obtenerPedidos();

      const existe = pedidos.some((p) => Number(p.id) === Number(pedido.id));

      if (existe) {
        throw new Error("Ya existe un pedido con ese ID.");
      }

      pedidos.push(pedido);

      await this.repository.guardarPedidos(pedidos);

      console.log("Pedido creado correctamente.");
    } catch (error: any) {
      console.log(error.message || "Error al crear el pedido.");
    }
  }

  // Método para actualizar
  async actualizar(pedido: Pedido): Promise<void> {
    try {
      const pedidos = await this.repository.obtenerPedidos();

      const indice = pedidos.findIndex((p) => Number(p.id) === Number(pedido.id));

      if (indice === -1) {
        console.log("El pedido no existe.");
        return;
      }

      pedidos[indice] = pedido;

      await this.repository.guardarPedidos(pedidos);

      console.log("Pedido Actualizado.");
    } catch (error) {
      console.log("Error al actualizar el pedido.");
    }
  }

  // Método para eliminar
  async eliminar(id: number): Promise<void> {
    try {
      const pedidos = await this.repository.obtenerPedidos();

      const nuevos = pedidos.filter((p) => Number(p.id) !== Number(id));

      if (nuevos.length === pedidos.length) {
        console.log("El pedido no existe.");
        return;
      }

      await this.repository.guardarPedidos(nuevos);

      console.log("Pedido eliminado.");
    } catch (error) {
      console.log("Error al eliminar el pedido.");
    }
  }

  // Método para buscar por id
  async buscarPorId(id: number): Promise<Pedido> {
    const pedidos = await this.repository.obtenerPedidos();
    const pedidoExistente = pedidos.find((p) => Number(p.id) === Number(id));

    if (!pedidoExistente) {
      throw new Error(`El pedido con ID ${id} no existe.`);
    }

    console.log("Pedido encontrado:", pedidoExistente);
    return pedidoExistente;
  }
}