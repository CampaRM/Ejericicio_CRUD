import { ProductoRepository } from "../data/productoRepository";
import { Producto } from "../models/producto";

export class ProductoService {
  private repository = new ProductoRepository();

  // Método para listar
  async listar(): Promise<Producto[]> {
    return await this.repository.obtenerProductos();
  }

  // Método para agregar
  async agregar(producto: Producto): Promise<void> {
    try {
      const productos = await this.repository.obtenerProductos();

      const existe = productos.some((p) => Number(p.id) === Number(producto.id));

      if (existe) {
        throw new Error("Ya existe un producto con ese ID.");
      }

      productos.push(producto);

      await this.repository.guardarProductos(productos);

      console.log("Producto creado correctamente.");
    } catch (error: any) {
      console.log(error.message || "Error al crear el producto.");
    }
  }

  // Método para actualizar
  async actualizar(producto: Producto): Promise<void> {
    try {
      const productos = await this.repository.obtenerProductos();

      const indice = productos.findIndex((p) => Number(p.id) === Number(producto.id));

      if (indice === -1) {
        console.log("El producto no existe.");
        return;
      }

      productos[indice] = producto;

      await this.repository.guardarProductos(productos);

      console.log("Producto actualizado.");
    } catch (error) {
      console.log("Error al actualizar el producto.");
    }
  }

  // Método para eliminar
  async eliminar(id: number): Promise<void> {
    try {
      const productos = await this.repository.obtenerProductos();

      const nuevos = productos.filter((p) => Number(p.id) !== Number(id));

      if (nuevos.length === productos.length) {
        console.log("El producto no existe.");
        return;
      }

      await this.repository.guardarProductos(nuevos);

      console.log("Producto eliminado.");
    } catch (error) {
      console.log("Error al eliminar el producto.");
    }
  }

  // Método para buscar por id
  async buscarPorId(id: number): Promise<Producto> {
    const productos = await this.repository.obtenerProductos();
    const productoExistente = productos.find((p) => Number(p.id) === Number(id));

    if (!productoExistente) {
      throw new Error(`El producto con ID ${id} no existe.`);
    }

    console.log("Producto encontrado:", productoExistente);
    return productoExistente;
  }
}