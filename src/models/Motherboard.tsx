export interface Motherboard {
    id: number;
    manufacturer: string;
    model: string;
    price: number;
    rating: number;
    photos: string[]
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