/// <reference path="GridColumn.ts" />

module Fayde.Experimental {
    import ContentControl = Fayde.Controls.ContentControl;

    export class GridTemplateColumn extends GridColumn {
        static DisplayTemplateProperty = DependencyProperty.Register("DisplayTemplate", () => DataTemplate, GridTemplateColumn);
        static EditTemplateProperty = DependencyProperty.Register("EditTemplate", () => DataTemplate, GridTemplateColumn);
        DisplayTemplate: DataTemplate;
        EditTemplate: DataTemplate;

        PrepareContainerForCell(cell: UIElement, item: any) {
            super.PrepareContainerForCell(cell, item);

            var binding: Data.Binding;

            if (cell instanceof ContentControl) {
                binding = new Data.Binding("DisplayTemplate");
                binding.Source = this;
                cell.SetBinding(ContentControl.ContentTemplateProperty, binding);
            }

            if (cell instanceof GridCell) {
                binding = new Data.Binding("EditTemplate");
                binding.Source = this;
                cell.SetBinding(GridCell.EditTemplateProperty, binding);
            }
        }
        ClearContainerForCell(cell: UIElement, item: any) {
            super.ClearContainerForCell(cell, item);

            if (cell instanceof ContentControl) {
                cell.ClearValue(ContentControl.ContentTemplateProperty);
            }

            if (cell instanceof GridCell) {
                cell.ClearValue(GridCell.EditTemplateProperty);
            }
        }
    }
}