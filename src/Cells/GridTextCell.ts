/// <reference path="GridInputCell.ts" />

module Fayde.Experimental {
    export class GridTextCell extends GridInputCell {
        constructor() {
            super();
            this.DefaultStyleKey = GridTextCell;
        }
    }
    Fayde.Controls.TemplateParts(GridTextCell, 
        { Name: "Presenter", Type: FrameworkElement },
        { Name: "Editor", Type: FrameworkElement });
    Fayde.Controls.TemplateVisualStates(GridTextCell,
        { GroupName: "EditStates", Name: "Display" },
        { GroupName: "EditStates", Name: "Edit" },
        { GroupName: "EditStates", Name: "NotEditable" });
} 