import * as events from 'events';
declare class Service extends events.EventEmitter {
    emitChange(): void;
    addChangeListener(callback: Function): void;
    removeChangeListener(callback: Function): void;
}
export default Service;
