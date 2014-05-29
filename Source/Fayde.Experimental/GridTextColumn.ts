/// <reference path="GridColumn.ts" />

module Fayde.Experimental {
    export class GridTextColumn extends GridColumn {
        static DisplayMemberPathProperty = DependencyProperty.Register("DisplayMemberPath", () => String, GridTextColumn);
        static ConverterProperty = DependencyProperty.Register("Converter", () => Fayde.Data.IValueConverter_, GridTextColumn);
        static StringFormatProperty = DependencyProperty.Register("StringFormat", () => String, GridTextColumn);
        static IsEditableProperty = DependencyProperty.Register("IsEditable", () => Boolean, GridTextColumn, false);
        DisplayMemberPath: string;
        Converter: Fayde.Data.IValueConverter;
        StringFormat: string;
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
                
                binding = new Data.Binding("Converter");
                binding.Source = this;
                cell.SetBinding(GridTextCell.ConverterProperty, binding);
                
                binding = new Data.Binding("StringFormat");
                binding.Source = this;
                cell.SetBinding(GridTextCell.StringFormatProperty, binding);
            }
        }
        ClearContainerForCell(cell: UIElement, item: any) {
            super.ClearContainerForCell(cell, item);
        }
    }
}