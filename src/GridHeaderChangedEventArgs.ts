module Fayde.Experimental {
    export class GridHeaderChangedEventArgs implements nullstone.IEventArgs {
        GridHeader: GridHeader;
        constructor(header: GridHeader) {
            Object.defineProperty(this, "GridHeader", { value: header, writable: false });
        }
    }
}