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

declare const framework: {
    Networking: typeof Networking;
    NetworkingEvents: typeof NetworkingEvents;
    EventDispatcher: typeof EventDispatcher;
    MVVM: {
        View: typeof View;
        ViewModel: typeof ViewModel;
        Decorator: typeof Decorator;
    };
};

export { framework as default };
