module Fayde.Experimental.Internal {
    export class ItemChangedCollection<T extends Fayde.XamlObject> extends XamlObjectCollection<T> {
        ItemChanged = new nullstone.Event<ItemChangedEventArgs<T>>();
        CollectionChanged = new nullstone.Event<Collections.CollectionChangedEventArgs>();

        _RaiseItemAdded(value: T, index: number) {
            this.CollectionChanged.raise(this, Collections.CollectionChangedEventArgs.Add(value, index));
        }
        _RaiseItemRemoved(value: T, index: number) {
            this.CollectionChanged.raise(this, Collections.CollectionChangedEventArgs.Remove(value, index));
        }
        _RaiseItemReplaced(removed: T, added: T, index: number) {
            this.CollectionChanged.raise(this, Collections.CollectionChangedEventArgs.Replace(added, removed, index));
        }
        _RaiseCleared(old: T[]) {
            this.CollectionChanged.raise(this, Collections.CollectionChangedEventArgs.Reset(old));
        }
    }

    export class ItemChangedEventArgs<T> implements nullstone.IEventArgs {
        Item: T;
        constructor(t: T) {
            Object.defineProperty(this, "Item", { value: t, writable: false });
        }
    }
}