import { Networking, NetworkingEvents } from './networking/Networking';
import EventDispatcher from './util/EventDispatcher';
import { View } from './mvvm/View';
import { ViewModel } from './mvvm/ViewModel';
import * as Decorator from './mvvm/Decorator';

const framework = {
    Networking: Networking,
    NetworkingEvents: NetworkingEvents,
    EventDispatcher: EventDispatcher,
    MVVM: {
        View: View,
        ViewModel: ViewModel,
        Decorator: Decorator,
    }
}

export default framework;