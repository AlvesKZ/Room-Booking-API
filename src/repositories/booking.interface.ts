import { getRedisClient } from "../config/redis.client";
import { Booking } from "../interfaces/booking.interface";
import { Repository } from "../interfaces/repository.interface";

export class BookingRepository implements Repository<Booking> {
  private redis = getRedisClient();

  async create(data: Booking): Promise<Booking> {
    const id = String(data.id);
    const roomId = String(data.roomId);

    await this.redis.set(
      `booking:${id}`,
      JSON.stringify(data)
    );

    await this.redis.sAdd(
      `bookings:room:${roomId}`,
      id
    );

    return data;
  }

  async findAll(): Promise<Booking[]> {
    const keys = await this.redis.keys("booking:*");

    const bookings = await Promise.all(
      keys.map(async key => {
        const data = await this.redis.get(key);
        return data ? (JSON.parse(data) as Booking) : null;
      })
    );

    return bookings.filter((b): b is Booking => b !== null);
  }

  async findById(id: string): Promise<Booking | null> {
    const data = await this.redis.get(`booking:${id}`);

    if (!data) return null;

    return JSON.parse(data) as Booking;
  }

  async findByRoom(roomId: string): Promise<Booking[]> {
    const ids = await this.redis.sMembers(
      `bookings:room:${roomId}`
    );

    const bookings = await Promise.all(
      ids.map(id => this.findById(id))
    );

    return bookings.filter((b): b is Booking => b !== null);
  }

  async update(id: string, data: Partial<Booking>): Promise<Booking | null> {
    const existing = await this.findById(id);
    if (!existing) return null;

    const updated: Booking = {
      ...existing,
      ...data,
      id: existing.id,
      roomId: existing.roomId,
    };

    await this.redis.set(
      `booking:${id}`,
      JSON.stringify(updated)
    );

    return updated;
  }

  async remove(id: string): Promise<boolean> {
    const existing = await this.findById(id);
    if (!existing) return false;

    await this.redis.del(`booking:${id}`);
    await this.redis.sRem(
      `bookings:room:${existing.roomId}`,
      id
    );

    return true;
  }
}
