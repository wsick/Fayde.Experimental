class TestItem extends Fayde.MVVM.ObservableObject {
    FirstName: string;
    LastName: string;
    Age: number;
    constructor(firstName?: string, lastName?: string, age?: number) {
        super();
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Age = age;
    }
}
Fayde.MVVM.NotifyProperties(TestItem, ["FirstName", "LastName", "Age"]);
export = TestItem; 