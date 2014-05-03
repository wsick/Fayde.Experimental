module Fayde.Experimental {
    export class EditingChangedEventArgs extends EventArgs {
        Item: any;
        Row: number;
        constructor(item: any, row: number) {
            super();
            Object.defineProperty(this, "Item", { value: item, writable: false });
            Object.defineProperty(this, "Row", { value: row, writable: false });
        }
    }
}