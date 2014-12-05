module Fayde.Experimental {
    export class GridColumnChangedEventArgs implements nullstone.IEventArgs {
        GridColumn: GridColumn;
        constructor(col: GridColumn) {
            Object.defineProperty(this, "GridColumn", { value: col, writable: false });
        }
    }
}