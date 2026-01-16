import { Repository } from "../interfaces/repository.interface";
import { Room } from "../interfaces/room.interface";
import { v4 as uuidv4 } from "uuid";

export class RoomService {
  constructor(
    private readonly roomRepository: Repository<Room>
  ) {}

  async create(data: Omit<Room, "id">): Promise<Room> {
    if (!data.name || data.name.trim().length === 0) {
      throw new Error("Room name is required.");
    }

    if (data.capacity <= 0) {
      throw new Error("Room capacity must be greater than zero.");
    }

    const room: Room = {
      id: uuidv4(),
      ...data,
      active: true,
    };

    return this.roomRepository.create(room);
  }

  async findAll(): Promise<Room[]> {
    return this.roomRepository.findAll();
  }

  async findById(id: string): Promise<Room> {
    const room = await this.roomRepository.findById(id);

    if (!room) {
      throw new Error("Room not found.");
    }

    return room;
  }

  async update(id: string, data: Partial<Room>): Promise<Room> {
    const room = await this.findById(id);

    if (data.capacity !== undefined && data.capacity <= 0) {
      throw new Error("Room capacity must be greater than zero.");
    }

    const updated = await this.roomRepository.update(id, {
      ...room,
      ...data,
      id: room.id,
    });

    if (!updated) {
      throw new Error("Failed to update room.");
    }

    return updated;
  }

  async deactivate(id: string): Promise<void> {
    const room = await this.findById(id);

    if (!room.active) {
      throw new Error("Room is already inactive.");
    }

    await this.roomRepository.update(id, { active: false });
  }
}
