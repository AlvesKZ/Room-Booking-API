import { getRedisClient } from "../config/redis.client";
import { Repository } from "../interfaces/repository.interface";
import { Room } from "../interfaces/room.interface";

export class RoomRepository implements Repository<Room> {
  private redis = getRedisClient();

  async create(data: Room): Promise<Room> {
    const id = data.id;

    await this.redis.set(`room:${data.id}`, JSON.stringify(data));

    await this.redis.sAdd("rooms", id);
    return data;
  }

  async findAll(): Promise<Room[]> {
    const ids = await this.redis.sMembers("rooms");

    const rooms = await Promise.all(ids.map((id) => this.findById(id)));

    return rooms.filter((r): r is Room => r !== null);
  }

  async findById(id: string): Promise<Room | null> {
    const data = await this.redis.get(`room:${id}`);

    if (!data) return null;

    return JSON.parse(data) as Room;
  }

  async update(id: string, data: Partial<Room>): Promise<Room | null> {
    const existing = await this.findById(id);

    if (!existing) return null;

    const updated: Room = {
      ...existing,
      ...data,
      id: existing.id,
    };

    await this.redis.set(`room:${id}`, JSON.stringify(updated));

    return updated;
  }

  async remove(id: string): Promise<boolean> {
    const existing = await this.findById(id);

    if (!existing) return false;

    await this.redis.del(`room:${id}`);
    await this.redis.sRem("rooms", id);

    return true;
  }
}
