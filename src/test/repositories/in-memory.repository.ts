export interface InMemoryRepository<T> {
  items: T[];
  create(item: T): Promise<void>;
}
