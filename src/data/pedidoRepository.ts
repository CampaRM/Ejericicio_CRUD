import { readFile, writeFile } from "fs/promises";
import { Pedido } from "../models/pedido";

export class PedidoRepository {
  private ruta = "./src/data/pedidos.json";

  // Método para obtener pedidos
  async obtenerPedidos(): Promise<Pedido[]> {
    try {
      const datos = await readFile(this.ruta, "utf-8");
      return JSON.parse(datos);
    } catch (error) {
      return [];
    }
  }

  // Método para guardar pedidos
  async guardarPedidos(pedidos: Pedido[]): Promise<void> {
    try {
      await writeFile(
        this.ruta,
        JSON.stringify(pedidos, null, 4)
      );
    } catch (error) {
      console.log("Error al escribir el archivo JSON:", error);
    }
  }
}