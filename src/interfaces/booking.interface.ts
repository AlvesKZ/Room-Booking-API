export interface Booking {
    readonly id: string;
    roomId: string;
    startTime: Date;
    endTime: Date;
    createdAt: Date;
}