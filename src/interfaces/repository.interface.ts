export interface Repository<T> {
  create(data: T): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  update?(id: string, data: Partial<T>): Promise<T | null>;
  remove?(id: string): Promise<boolean>;
  findByRoom?(roomId: string): Promise<T[]>;
}
