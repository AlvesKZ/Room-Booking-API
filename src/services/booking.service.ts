import { Repository } from "../interfaces/repository.interface";
import { Booking } from "../interfaces/booking.interface";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

export class BookingService {
  constructor(
    private readonly bookingRepository: Repository<Booking>
  ) {}

  async create(
    data: Omit<Booking, "id" | "createdAt">
  ): Promise<Booking> {

    if (!this.bookingRepository.findByRoom) {
      throw new Error("Repository does not support findByRoom");
    }

    const start = dayjs(data.startTime);
    const end = dayjs(data.endTime);
    const now = dayjs();

    if (!start.isValid() || !end.isValid()) {
      throw new Error("Invalid date format");
    }

    if (start.isBefore(now)) {
      throw new Error("Booking cannot be in the past");
    }

    if (!end.isAfter(start)) {
      throw new Error("End time must be after start time");
    }

    const existingBookings =
      await this.bookingRepository.findByRoom(data.roomId);

    const hasConflict = existingBookings.some(existing => {
      const existingStart = dayjs(existing.startTime);
      const existingEnd = dayjs(existing.endTime);

      return start.isBefore(existingEnd) &&
             end.isAfter(existingStart);
    });

    if (hasConflict) {
      throw new Error("Room already booked for this time range");
    }

    const booking: Booking = {
      id: uuidv4(),
      roomId: data.roomId,
      startTime: data.startTime,
      endTime: data.endTime,
      createdAt: new Date(),
    };

    return this.bookingRepository.create(booking);
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.findAll();
  }

  async findById(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findById(id);

    if (!booking) {
      throw new Error("Booking not found");
    }

    return booking;
  }

  async remove(id: string): Promise<void> {
    if (!this.bookingRepository.remove) {
      throw new Error("Repository does not support remove");
    }

    const removed = await this.bookingRepository.remove(id);

    if (!removed) {
      throw new Error("Booking not found");
    }
  }

  
}
