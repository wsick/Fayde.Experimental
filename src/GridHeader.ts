/// <reference path="Internal/ItemChangedCollection.ts" />

module Fayde.Experimental {
    import ContentControl = Fayde.Controls.ContentControl;

    export class GridHeader extends DependencyObject {
        static HeaderProperty = DependencyProperty.Register("Header", () => Object, GridHeader);
        static HeaderTemplateProperty = DependencyProperty.Register("HeaderTemplate", () => DataTemplate, GridHeader);
        static HeaderStyleProperty = DependencyProperty.Register("HeaderStyle", () => Style, GridHeader);
        Header: any;
        HeaderTemplate: DataTemplate;
        HeaderStyle: Style;

        GetContainerForCell(): UIElement {
            return new GridHeaderCell();
        }
        PrepareContainerForCell(cell: UIElement) {
            var gc = <GridHeaderCell>cell;
            if (gc instanceof GridHeaderCell) {
                var binding = new Data.Binding("Header");
                binding.Source = this;
                gc.SetBinding(ContentControl.ContentProperty, binding);

                binding = new Data.Binding("HeaderTemplate");
                binding.Source = this;
                gc.SetBinding(ContentControl.ContentTemplateProperty, binding);
                
                binding = new Data.Binding("HeaderStyle");
                binding.Source = this;
                binding.Mode = Data.BindingMode.OneWay;
                gc.SetBinding(FrameworkElement.StyleProperty, binding);
            }
        }
        ClearContainerForCell(cell: UIElement) {
            var gc = <GridHeaderCell>cell;
            if (gc instanceof GridHeaderCell) {
                gc.ClearValue(ContentControl.ContentProperty);
                gc.ClearValue(ContentControl.ContentTemplateProperty);
                gc.ClearValue(FrameworkElement.StyleProperty);
            }
        }
    }

    export class GridHeaderCollection extends Internal.ItemChangedCollection<GridHeader> {
    }
}