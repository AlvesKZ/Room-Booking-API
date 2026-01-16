export interface Room {
    readonly id: number;
    name: string;
    capacity: number;
    resources: string[];
    active: boolean;
    addResource(): void;
    reserve(): void
}