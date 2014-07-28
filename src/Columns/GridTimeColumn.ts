/// <reference path="GridInputColumn.ts" />

module Fayde.Experimental {
    export class GridTimeColumn extends GridInputColumn {
        GetContainerForCell(item: any) {
            return new GridTimeCell();
        }
    }
} 