declare class Networking {
    start(): void;
}
declare enum NetworkingEvents {
    DATA1 = "DATA1",
    DATA2 = "DATA2"
}

declare class EventDispatcher {
    private static listeners;
    static addListener(event: string, callback: (data: any) => void): void;
    static remove(event: string, callback?: (data: any) => void): void;
    static removeAllListeners(): void;
    static emit(event: string, data: any): void;
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
declare const MakeBindKey: (key: string) => string;
declare const MakeBinderKey: (key: string) => string;
declare const MakeBindableKey: (key: string) => string;
declare const BindRegExp: RegExp;
declare const BindableRegExp: RegExp;
declare function UseViewModel(VMClass: typeof ViewModel): ClassDecorator;

declare const Decorator_BindRegExp: typeof BindRegExp;
declare const Decorator_BindableRegExp: typeof BindableRegExp;
declare const Decorator_MakeBindKey: typeof MakeBindKey;
declare const Decorator_MakeBindableKey: typeof MakeBindableKey;
declare const Decorator_MakeBinderKey: typeof MakeBinderKey;
declare const Decorator_UseViewModel: typeof UseViewModel;
declare const Decorator_bind: typeof bind;
declare const Decorator_bindable: typeof bindable;
declare namespace Decorator {
  export { Decorator_BindRegExp as BindRegExp, Decorator_BindableRegExp as BindableRegExp, Decorator_MakeBindKey as MakeBindKey, Decorator_MakeBindableKey as MakeBindableKey, Decorator_MakeBinderKey as MakeBinderKey, Decorator_UseViewModel as UseViewModel, Decorator_bind as bind, Decorator_bindable as bindable };
}

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
interface Long {
    low: number;
    high: number;
    unsigned: boolean;
}

type Model_Long = Long;
type Model_Membership = Membership;
type Model_Person = Person;
type Model_Persons = Persons;
declare const Model_decodeMembership: typeof decodeMembership;
declare const Model_decodePerson: typeof decodePerson;
declare const Model_decodePersons: typeof decodePersons;
declare const Model_encodeMembership: typeof encodeMembership;
declare const Model_encodePerson: typeof encodePerson;
declare const Model_encodePersons: typeof encodePersons;
declare namespace Model {
  export { type Model_Long as Long, type Model_Membership as Membership, type Model_Person as Person, type Model_Persons as Persons, Model_decodeMembership as decodeMembership, Model_decodePerson as decodePerson, Model_decodePersons as decodePersons, Model_encodeMembership as encodeMembership, Model_encodePerson as encodePerson, Model_encodePersons as encodePersons };
}

declare const framework: {
    Networking: typeof Networking;
    Model: typeof Model;
    NetworkingEvents: typeof NetworkingEvents;
    EventDispatcher: typeof EventDispatcher;
    MVVM: {
        View: typeof View;
        ViewModel: typeof ViewModel;
        Decorator: typeof Decorator;
    };
};

export { framework as default };
