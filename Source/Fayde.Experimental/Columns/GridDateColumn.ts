/// <reference path="GridInputColumn.ts" />

module Fayde.Experimental {
    export class GridDateColumn extends GridInputColumn {
        GetContainerForCell(item: any) {
            return new GridDateCell();
        }
    }
} 