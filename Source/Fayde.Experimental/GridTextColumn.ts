/// <reference path="GridColumn.ts" />

module Fayde.Experimental {
    export class GridTextColumn extends GridColumn {
        static DisplayMemberPathProperty = DependencyProperty.Register("DisplayMemberPath", () => String, GridTextColumn);
        DisplayMemberPath: string;

        GetContainerForCell(item: any) {
            return new GridTextCell();
        }
        PrepareContainerForCell(cell: UIElement, item: any) {
            super.PrepareContainerForCell(cell, item);

            var binding: Data.Binding;

            if (cell instanceof GridTextCell) {
                binding = new Data.Binding("DisplayMemberPath");
                binding.Source = this;
                cell.SetBinding(GridTextCell.DisplayMemberPathProperty, binding);
            }
        }
        ClearContainerForCell(cell: UIElement, item: any) {
            super.ClearContainerForCell(cell, item);
        }
    }
}