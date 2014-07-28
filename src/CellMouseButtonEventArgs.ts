module Fayde.Experimental {
    export class CellMouseButtonEventArgs extends Input.MouseButtonEventArgs {
        public Cell: UIElement;
        constructor(cell: UIElement, args: Input.MouseButtonEventArgs) {
            super(args.AbsolutePos);
            Object.defineProperty(this, "Cell", { value: cell, writable: false });
        }
    }
} 