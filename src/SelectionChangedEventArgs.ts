module Fayde.Experimental {
    export class SelectionChangedEventArgs implements nullstone.IEventArgs {
        Item: any;
        Row: number;
        constructor(item: any, row: number) {
            Object.defineProperty(this, "Item", { value: item, writable: false });
            Object.defineProperty(this, "Row", { value: row, writable: false });
        }
    }
}