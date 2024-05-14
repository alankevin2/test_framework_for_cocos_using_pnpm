declare class Networking {
    start(): void;
}

declare class EventDispatcher {
    private static listeners;
    static addListener(event: string, callback: (data: any) => void): void;
    static remove(event: string, callback?: (data: any) => void): void;
    static removeAllListeners(): void;
    static emit(event: string, data: any): void;
}

declare const framework: {
    Networking: typeof Networking;
    EventDispatcher: typeof EventDispatcher;
};

export { framework as default };
