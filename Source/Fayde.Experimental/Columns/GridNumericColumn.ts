/// <reference path="GridInputColumn.ts" />

module Fayde.Experimental {
    export class GridNumericColumn extends GridInputColumn {
        GetContainerForCell(item: any) {
            return new GridNumericCell();
        }
    }
}