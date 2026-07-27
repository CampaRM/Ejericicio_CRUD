export interface Pedido {
  id: number;
  usuarioId: number;
  productoId: number;
  cantidad: number;
  total: number;
  fecha: string;
  estado: 'PENDIENTE' | 'COMPLETADO' | 'CANCELADO';
}