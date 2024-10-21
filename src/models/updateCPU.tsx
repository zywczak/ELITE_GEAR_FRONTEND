export interface UpdateCPU {
    manufacturer: string;
    model: string;
    price: number;
    photos: File[];
    speed: number;
    architecture: string;
    supportedMemory: string;
    cooling: boolean;
    threads: number;
    technologicalProcess: number;
    powerConsumption: number;
}