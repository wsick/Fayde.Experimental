/// <reference path="GridColumn.ts" />

module Fayde.Experimental {
    export class GridInputColumn extends GridColumn {
        static DisplayMemberPathProperty = DependencyProperty.Register("DisplayMemberPath", () => String, GridInputColumn);
        static ConverterProperty = DependencyProperty.Register("Converter", () => Fayde.Data.IValueConverter_, GridInputColumn);
        static StringFormatProperty = DependencyProperty.Register("StringFormat", () => String, GridInputColumn);
        DisplayMemberPath: string;
        Converter: Fayde.Data.IValueConverter;
        StringFormat: string;

        PrepareContainerForCell(cell: UIElement, item: any) {
            super.PrepareContainerForCell(cell, item);

            var binding: Data.Binding;

            if (cell instanceof GridInputCell) {
                binding = new Data.Binding("DisplayMemberPath");
                binding.Source = this;
                cell.SetBinding(GridInputCell.DisplayMemberPathProperty, binding);

                binding = new Data.Binding("Converter");
                binding.Source = this;
                cell.SetBinding(GridInputCell.ConverterProperty, binding);

                binding = new Data.Binding("StringFormat");
                binding.Source = this;
                cell.SetBinding(GridInputCell.StringFormatProperty, binding);
            }
        }
        ClearContainerForCell(cell: UIElement, item: any) {
            super.ClearContainerForCell(cell, item);

            if (cell instanceof GridInputCell) {
                cell.ClearValue(GridInputCell.DisplayMemberPathProperty);
                cell.ClearValue(GridInputCell.ConverterProperty);
                cell.ClearValue(GridInputCell.StringFormatProperty);
            }
        }
    }
}