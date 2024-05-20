declare class EventDispatcher {
    private static listeners;
    static addListener(event: string, callback: (data: any) => void): void;
    static remove(event: string, callback?: (data: any) => void): void;
    static removeAllListeners(): void;
    static emit(event: string, data: any): void;
}

declare class Networking {
    start(): void;
}
declare enum NetworkingEvents {
    DATA1 = "DATA1",
    DATA2 = "DATA2"
}

interface ViewModelDependent {
    dependentDestroyed: boolean;
    modelDidChange(key: string, value: any, preValue: any): void;
}
declare class ViewModel {
    protected dependent: View;
    protected dependentClass: typeof View;
    constructor(comp: typeof View);
    startBinding(): void;
    componentLoaded<T extends View>(comp: T): void;
}

declare var cc: any;

declare class View extends cc.Component implements ViewModelDependent {
    dependentDestroyed: boolean;
    protected viewModel: ViewModel;
    private keysWithBinder;
    protected onLoad(): void;
    protected onDestroy(): void;
    private startBinding;
    private executeBinding;
    modelDidChange(key: string, value: any, previousValue: any): void;
}

declare function bind(binder?: any): PropertyDecorator;
declare function bindable(target: ViewModel, key: string): void;
declare function UseViewModel(VMClass: typeof ViewModel): ClassDecorator;

interface Person {
    name?: string;
    age?: number;
    hobbies?: string[];
    membership?: Membership;
}
declare function encodePerson(message: Person): Uint8Array;
declare function decodePerson(binary: Uint8Array): Person;
interface Persons {
    persons?: Person[];
}
declare function encodePersons(message: Persons): Uint8Array;
declare function decodePersons(binary: Uint8Array): Persons;
interface Membership {
    plan?: number;
    expiration?: string;
}
declare function encodeMembership(message: Membership): Uint8Array;
declare function decodeMembership(binary: Uint8Array): Membership;

export { EventDispatcher, type Membership, Networking, NetworkingEvents, type Person, type Persons, UseViewModel, View, ViewModel, bind, bindable, decodeMembership, decodePerson, decodePersons, encodeMembership, encodePerson, encodePersons };
