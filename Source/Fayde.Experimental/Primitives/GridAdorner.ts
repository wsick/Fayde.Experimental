/// <reference path="../Internal/ItemChangedCollection.ts" />

module Fayde.Experimental.Primitives {
    export class GridAdorner extends DependencyObject {
        OnAttached(gic: GridItemsControl) {
        }
        OnDetached(gic: GridItemsControl) {
        }
    }

    export class GridAdornerCollection extends Internal.ItemChangedCollection<GridAdorner> {
    }
}