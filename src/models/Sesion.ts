
export interface Sesion {
  tokenPayload: string; 
  createdAt: Date;
  expiresAt: Date;
  refreshAt: Date;
  nombre: string; // Agregar nombre
  rol: 'administrador' | 'usuario'; // Agregar rol
}

export interface SesionState {
  loading: boolean;
  data: Sesion | null; 
}
