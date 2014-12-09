/// <reference path="GridInputCell.ts" />

module Fayde.Experimental {
    export class GridTimeCell extends GridInputCell {
        constructor() {
            super();
            this.DefaultStyleKey = GridTimeCell;
        }
    }
    Fayde.Controls.TemplateParts(GridDateCell, 
        { Name: "Presenter", Type: FrameworkElement },
        { Name: "Editor", Type: FrameworkElement });
    Fayde.Controls.TemplateVisualStates(GridDateCell,
        { GroupName: "EditStates", Name: "Display" },
        { GroupName: "EditStates", Name: "Edit" },
        { GroupName: "EditStates", Name: "NotEditable" });
}  