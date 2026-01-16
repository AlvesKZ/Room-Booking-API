export interface Booking {
    readonly id: number;
    roomId: number;
    startTime: Date;
    endTime: Date;
    createdAt: Date;
}