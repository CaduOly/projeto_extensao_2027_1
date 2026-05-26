export interface Alert {
  id?: number;
  description: string;
  latitude: number;
  longitude: number;
  photo?: string; // String codificada em Base64
  type: 'DISPOSAL' | 'RECYCLING';
  createdAt?: string;
}
