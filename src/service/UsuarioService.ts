import { UsuarioRepository } from "../repository/UsuarioRepository";
import { Usuario } from "../models/Usuario";

export class UsuarioService {
  private repository = new UsuarioRepository();

  // Método para listar
  async listar(): Promise<Usuario[]> {
    return await this.repository.obtenerUsuarios();
  }

  // Métdodo para agregar
  async agregar(usuario: Usuario): Promise<void> {
    try {
      const usuarios = await this.repository.obtenerUsuarios();

      const existe = usuarios.some((u) => u.id === usuario.id);

      if (!this.correoValido(usuario.correo)) {
        throw new Error(
          "El correo debe ser de dominio permitido (@gmail.com, @hotmail.com, @outlook.com)."
        );
    }
      if (existe) {
        throw new Error("Ya existe un usuario con ese ID.");
      }

      usuarios.push(usuario);

      await this.repository.guardarUsuarios(usuarios);

      console.log("Usuarios creado correctamente.");
      console.log(`Bienvenido ${usuario.nombre}`)
    } catch (error) {
      console.log("Error al crear el usuario.");
    }
  }

  // Método para actualizar
  async actualizar(usuario: Usuario): Promise<void> {
    try {
      const usuarios = await this.repository.obtenerUsuarios();

      const indice = usuarios.findIndex((u) => u.id === usuario.id);

      if (!this.correoValido(usuario.correo)) {
        throw new Error(
          "El correo debe ser de dominio permitido (@gmail.com, @hotmail.com, @outlook.com)."
        );
      }

      if (indice === -1) {
        console.log("El usuario no existe.");
        return;
      }

      usuarios[indice] = usuario;

      await this.repository.guardarUsuarios(usuarios);

      console.log("Usuario Actualizado.");
    } catch (error) {
      console.log("Error al actualizar el usuario.");
    }
  }

  // Método para eliminar
  async eliminar(id: number): Promise<void> {
    try {
      const usuarios = await this.repository.obtenerUsuarios();

      const nuevos = usuarios.filter((u) => u.id !== id);

      if (nuevos.length === usuarios.length) {
        false;
      }

      await this.repository.guardarUsuarios(nuevos);

      console.log("Usuario eliminado.");
    } catch (error) {
      console.log("Error al eliminar.");
    }
  }

  // metodo para iniciar sesión
  async login(
    correo: string,
    contrasena: number,
  ): Promise<Usuario | undefined> {
    return await this.repository.buscarCredenciales(correo, contrasena);
  }

  //Metodo para buscar por id
  async buscarPorId(id: number): Promise<Usuario> {
    const usuarios = await this.repository.obtenerUsuarios();
    const usuarioExistente = usuarios.find((u) => Number(u.id) === Number(id));

    if (!usuarioExistente) {
      throw new Error(`El usuario con ID ${id} no existe.`);
    }
    console.log("Usuario encontrado:", usuarioExistente);
    return usuarioExistente;
  }

  private correoValido(correo: string): boolean {

    const dominio = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook)\.com$/i;

    return dominio.test(correo.trim());
  }
}
