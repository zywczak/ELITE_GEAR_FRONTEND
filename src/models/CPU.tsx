export interface CPU {
    id: number;
    manufacturer: string;
    model: string;
    price: number;
    rating: number;
    photos: string[]
    speed: number;
    architecture: string;
    supportedMemory: string;
    cooling: boolean;
    threads: number;
    technologicalProcess: number;
    powerConsumption: number;
}