export interface UpdateMotherboard {
    manufacturer: string;
    model: string;
    price: number;
    rating: number;
    photos: File[]
    chipset: string;
    formFactor: string;
    supportedMemory: string;
    socket: string;
    cpuArchitecture: string;
    internalConnectors: string;
    externalConnectors: string;
    memorySlots: number;
    audioSystem: string;
}