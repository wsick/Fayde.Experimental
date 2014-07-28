module Fayde.Experimental {
    export class CellMouseEventArgs extends Input.MouseEventArgs {
        public Cell: UIElement;
        constructor(cell: UIElement, args: Input.MouseEventArgs) {
            super(args.AbsolutePos);
            Object.defineProperty(this, "Cell", { value: cell, writable: false });
        }
    }
} 