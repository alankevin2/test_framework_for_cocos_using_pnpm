import { View } from "./View";
import { BindableRegExp } from "./Decorator";

export interface ViewModelDependent {
    dependentDestroyed: boolean
    modelDidChange(key: string, value: any, preValue: any): void
}

export class ViewModel {

    protected dependent: View
    protected dependentClass: typeof View;

    constructor(comp: typeof View) {
        if (Object.getPrototypeOf(comp) != View) {
            throw new Error('UseViewModel can only apply on those who inherits View');
        }
        this.dependentClass = comp;
    }

    /**
     * 此方法被Decorator呼叫
     */
    public startBinding() {
        const keys = Object.keys(Object.getPrototypeOf(this));
        keys.forEach(k => {
            if (BindableRegExp.test(k)) {
                const retrieveKey = BindableRegExp.exec(k)![1];
                // @ts-ignore
                this[k] = this[retrieveKey]; // 這裡已經實例化，我們拿實例化該變數的初始值來給予我們即將defineProperty物件的初始值。
                Object.defineProperty(this, retrieveKey, {
                    set: function(newVal) {
                        const prev = this[k];
                        if (prev == newVal) { return; }
                        this[k] = newVal;
                        // isValid 當component被銷毀就會是false
                        this.dependent && this.dependent.isValid && this.dependent.modelDidChange(retrieveKey, newVal, prev);
                    },
                    get: function() {
                        return this[k];
                    },
                    configurable: true,
                    enumerable: true
                });
            }
        });
    }

    /**
     * 這個方法只會被BaseComponent呼叫
     */
    public componentLoaded<T extends View >(comp: T) {
        this.dependent = comp;
        if (this.dependent.constructor.name != this.dependentClass.name) {
            throw new Error(`Component is loaded into ViewModel but did not match Class name which was originally set. 
                ${this.dependent.constructor.name} and ${this.dependentClass.name} not match.`)
        }
    }
}
