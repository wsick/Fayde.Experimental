/// <reference path="Primitives/GridAdorner.ts" />

module Fayde.Experimental {
    import Grid = Fayde.Controls.Grid;
    import Border = Fayde.Controls.Border;

    export class HoveredRowAdorner extends Primitives.GridAdorner {
        static BackgroundProperty = DependencyProperty.Register("Background", () => Media.Brush, HoveredRowAdorner);
        static BorderBrushProperty = DependencyProperty.Register("BorderBrush", () => Media.Brush, HoveredRowAdorner);
        static BorderThicknessProperty = DependencyProperty.Register("BorderThickness", () => Thickness, HoveredRowAdorner);
        static CornerRadiusProperty = DependencyProperty.Register("CornerRadius", () => CornerRadius, HoveredRowAdorner);
        Background: Media.Brush;
        BorderBrush: Media.Brush;
        BorderThickness: Thickness;
        CornerRadius: CornerRadius;

        private _HoverRow: number = -1;
        private _InGrid: boolean = false;
        private _Element: UIElement = null;

        OnAttached(gic: GridItemsControl) {
            super.OnAttached(gic);
            var grid = gic.ItemsPresenter.Panel;
            grid.Children.Add(this._Element = this.CreateElement());
            Fayde.Controls.Panel.SetZIndex(this._Element, -1);
            Grid.SetColumnSpan(this._Element, grid.ColumnDefinitions.Count);
            grid.MouseMove.Subscribe(this._MouseMove, this);
            grid.MouseEnter.Subscribe(this._MouseEnter, this);
            grid.MouseLeave.Subscribe(this._MouseLeave, this);
            this.OnHoverRowChanged(-1, -1);
        }
        OnDetached(gic: GridItemsControl) {
            super.OnDetached(gic);
            var grid = gic.ItemsPresenter.Panel;
            grid.MouseMove.Unsubscribe(this._MouseMove, this);
            grid.MouseEnter.Unsubscribe(this._MouseEnter, this);
            grid.MouseLeave.Unsubscribe(this._MouseLeave, this);
            grid.Children.Remove(this._Element);
            this._Element = null;
        }
        private _MouseMove(sender: any, e: Input.MouseEventArgs) {
            var grid = <Grid>sender;
            var pos = e.GetPosition(grid);
            var row = this._InGrid ? getRow(pos.Y, grid) : -1;
            if (this._HoverRow === row)
                return;
            var oldRow = this._HoverRow;
            this._HoverRow = row;
            this.OnHoverRowChanged(oldRow, row);
        }
        private _MouseEnter(sender: any, e: Input.MouseEventArgs) {
            this._InGrid = true;
        }
        private _MouseLeave(sender: any, e: Input.MouseEventArgs) {
            this._InGrid = false;
        }
        OnHoverRowChanged(oldRow: number, newRow: number) {
            var el = this._Element;
            if (!el)
                return;
            el.Visibility = newRow > -1 ? Visibility.Visible : Visibility.Collapsed;
            Grid.SetRow(el, newRow > -1 ? newRow : 0);
        }
        CreateElement(): UIElement {
            var el = new Border();
            
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

            return el;
        }
    }

    function getRow(posY: number, grid: Grid): number {
        if (posY < 0)
            return i;
        for (var i = 0, enumerator = grid.RowDefinitions.GetEnumerator(); posY > 0 && enumerator.MoveNext(); i++) {
            posY -= enumerator.Current.ActualHeight;
            if (posY < 0)
                return i;
        }
        return -1;
    }
}