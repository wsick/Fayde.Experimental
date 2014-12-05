/// <reference path="Primitives/GridAdorner.ts" />

module Fayde.Experimental {
    import Grid = Fayde.Controls.Grid;
    import Border = Fayde.Controls.Border;

    export class HoveredRowAdorner extends Primitives.GridAdorner {
        static BackgroundProperty = DependencyProperty.Register("Background", () => Media.Brush, HoveredRowAdorner);
        static BorderBrushProperty = DependencyProperty.Register("BorderBrush", () => Media.Brush, HoveredRowAdorner);
        static BorderThicknessProperty = DependencyProperty.Register("BorderThickness", () => Thickness, HoveredRowAdorner);
        static CornerRadiusProperty = DependencyProperty.Register("CornerRadius", () => CornerRadius, HoveredRowAdorner);
        static CursorProperty = DependencyProperty.Register("Cursor", () => new Enum(Fayde.CursorType), HoveredRowAdorner, Fayde.CursorType.Hand);
        Background: Media.Brush;
        BorderBrush: Media.Brush;
        BorderThickness: Thickness;
        CornerRadius: CornerRadius;
        Cursor: Fayde.CursorType;

        private _HoverRow: number = -1;
        private _Element: UIElement = null;
        private _ForegroundElement: UIElement = null;

        CreateBackgroundElement(): UIElement {
            var el = new Border();
            el.IsHitTestVisible = false;
            
            var binding = new Data.Binding("Background");
            binding.Source = this;
            el.SetBinding(Border.BackgroundProperty, binding);

            binding = new Data.Binding("BorderBrush");
            binding.Source = this;
            el.SetBinding(Border.BorderBrushProperty, binding);

            binding = new Data.Binding("BorderThickness");
            binding.Source = this;
            el.SetBinding(Border.BorderThicknessProperty, binding);

            binding = new Data.Binding("CornerRadius");
            binding.Source = this;
            el.SetBinding(Border.CornerRadiusProperty, binding);

            Fayde.Controls.Panel.SetZIndex(el, -10);

            return el;
        }
        CreateForegroundElement(): UIElement {
            var el = new Border();
            el.IsHitTestVisible = false;
            el.Background = new Fayde.Media.SolidColorBrush(Color.KnownColors.Transparent);
            
            var binding = new Data.Binding("Cursor");
            binding.Source = this;
            el.SetBinding(FrameworkElement.CursorProperty, binding);

            Fayde.Controls.Panel.SetZIndex(el, 10);

            return el;
        }

        OnAttached(gic: GridItemsControl) {
            super.OnAttached(gic);
            var presenter = gic.ItemsPresenter;
            presenter.CellMouseEnter.on(this._CellMouseEnter, this);
            presenter.CellMouseLeave.on(this._CellMouseLeave, this);

            var grid = presenter.Panel;
            grid.Children.Add(this._Element = this.CreateBackgroundElement());
            Grid.SetColumnSpan(this._Element, grid.ColumnDefinitions.Count);
            grid.Children.Add(this._ForegroundElement = this.CreateForegroundElement());
            Grid.SetColumnSpan(this._ForegroundElement, grid.ColumnDefinitions.Count);

            this.OnHoverRowChanged(-1, -1);
        }
        OnDetached(gic: GridItemsControl) {
            super.OnDetached(gic);
            var presenter = gic.ItemsPresenter;
            presenter.CellMouseEnter.off(this._CellMouseEnter, this);
            presenter.CellMouseLeave.off(this._CellMouseLeave, this);

            var grid = presenter.Panel;
            grid.Children.Remove(this._Element);
            grid.Children.Remove(this._ForegroundElement);
            this._Element = null;
            this._ForegroundElement = null;
        }
        private _CellMouseEnter(sender: any, e: CellMouseEventArgs) {
            this._SetHoverRow(Grid.GetRow(e.Cell));
        }
        private _CellMouseLeave(sender: any, e: CellMouseEventArgs) {
            this._SetHoverRow(-1);
        }
        private _SetHoverRow(row: number) {
            if (this._HoverRow === row)
                return;
            var oldRow = this._HoverRow;
            this._HoverRow = row;
            this.OnHoverRowChanged(oldRow, row);
        }
        OnHoverRowChanged(oldRow: number, newRow: number) {
            var el = this._Element;
            var fel = this._ForegroundElement;
            if (el) {
                el.Visibility = newRow > -1 ? Visibility.Visible : Visibility.Collapsed;
                Grid.SetRow(el, newRow > -1 ? newRow : 0);
            }
            if (fel) {
                fel.Visibility = newRow > -1 ? Visibility.Visible : Visibility.Collapsed;
                Grid.SetRow(fel, newRow > -1 ? newRow : 0);
            }
        }
    }
}