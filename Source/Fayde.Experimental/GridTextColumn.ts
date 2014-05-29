/// <reference path="GridColumn.ts" />

module Fayde.Experimental {
    export class GridTextColumn extends GridColumn {
        static DisplayMemberPathProperty = DependencyProperty.Register("DisplayMemberPath", () => String, GridTextColumn);
        static IsEditableProperty = DependencyProperty.Register("IsEditable", () => Boolean, GridTextColumn, false);
        DisplayMemberPath: string;
        IsEditable: boolean;

        GetContainerForCell(item: any) {
            return new GridTextCell();
        }
        PrepareContainerForCell(cell: UIElement, item: any) {
            super.PrepareContainerForCell(cell, item);

            var binding: Data.Binding;

            if (cell instanceof GridCell) {
                binding = new Data.Binding("IsEditable");
                binding.Source = this;
                cell.SetBinding(GridCell.IsEditableProperty, binding);
            }

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