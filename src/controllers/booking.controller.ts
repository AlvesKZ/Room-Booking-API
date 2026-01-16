import { Request, Response } from "express";
import { BookingService } from "../services/booking.service";

export class BookingController {
    constructor (private readonly bookingService: BookingService) {}

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { roomId, startTime, endTime } = req.body;
            
            const booking = await this.bookingService.create({
                roomId,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
            });

            return res.status(200).json(booking);
        } catch (e: any) {
            return res.status(400).json({
                errors: e.errors.map((err: any) => err.message),
            });
        }
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const bookings = await this.bookingService.findAll();

            return res.status(200).json(bookings);
        } catch (e: any) {
            return res.status(500).json({
                error: "Internal server error",
            });
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            if (typeof id !== "string") return res.status(401).json({
                error: "The ID must be sent.",
            });

            const booking = await this.bookingService.findById(id)
            return res.status(200).json(booking);
        } catch (e: any) {
            return res.status(404).json({
                errors: e.errors.map((err: any) => err.message),
            });
        }
    }

    async remove(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            if (typeof id !== "string") return res.status(401).json({
                error: "The ID must be sent.",
            });

            await this.bookingService.remove(id);

            return res.status(204).send();
        } catch (e: any) {
            return res.status(404).json({
                errors: e.errors.map((err: any) => err.message),
            });
        }
    }
}