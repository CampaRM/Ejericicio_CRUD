import { readFile, writeFile } from "fs/promises";
import { Producto } from "../models/producto";

export class ProductoRepository {
  // Ruta donde se almacenará el archivo JSON de productos
  private ruta = "./src/data/productos.json";

  // Método para obtener productos | mostrar datos
  async obtenerProductos(): Promise<Producto[]> {
    try {
      const datos = await readFile(this.ruta, "utf-8");
      return JSON.parse(datos);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // Método para guardar productos | escribir datos
  async guardarProductos(productos: Producto[]): Promise<void> {
    try {
      await writeFile(
        this.ruta,
        JSON.stringify(productos, null, 4)
      );
    } catch (error) {
      console.log(error);
    }
  }
}