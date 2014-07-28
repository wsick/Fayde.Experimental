module Fayde.Experimental.Internal {
    export class ItemChangedCollection<T extends Fayde.XamlObject> extends XamlObjectCollection<T> {
        ItemChanged = new MulticastEvent<ItemChangedEventArgs<T>>();
        CollectionChanged = new MulticastEvent<Collections.CollectionChangedEventArgs>();

        _RaiseItemAdded(value: T, index: number) {
            this.CollectionChanged.Raise(this, Collections.CollectionChangedEventArgs.Add(value, index));
        }
        _RaiseItemRemoved(value: T, index: number) {
            this.CollectionChanged.Raise(this, Collections.CollectionChangedEventArgs.Remove(value, index));
        }
        _RaiseItemReplaced(removed: T, added: T, index: number) {
            this.CollectionChanged.Raise(this, Collections.CollectionChangedEventArgs.Replace(added, removed, index));
        }
        _RaiseCleared(old: T[]) {
            this.CollectionChanged.Raise(this, Collections.CollectionChangedEventArgs.Reset(old));
        }
    }

    export class ItemChangedEventArgs<T> extends EventArgs {
        Item: T;
        constructor(t: T) {
            super();
            Object.defineProperty(this, "Item", { value: t, writable: false });
        }
    }
}