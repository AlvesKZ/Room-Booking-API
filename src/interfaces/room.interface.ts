export interface Room {
    readonly id: string;
    name: string;
    capacity: number;
    resources: string[];
    active: boolean;
    addResource(): void;
    reserve(): void
}