/// <reference path="GridInputCell.ts" />

module Fayde.Experimental {
    export class GridTextCell extends GridInputCell {
        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }
    }
    Fayde.Controls.TemplateParts(GridTextCell, 
        { Name: "Presenter", Type: FrameworkElement },
        { Name: "Editor", Type: FrameworkElement });
} 