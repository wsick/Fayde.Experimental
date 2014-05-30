/// <reference path="GridInputColumn.ts" />

module Fayde.Experimental {
    export class GridTextColumn extends GridInputColumn {
        GetContainerForCell(item: any) {
            return new GridTextCell();
        }
    }
}