"use server";
import Task from "./TaskModel";
import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();

  private constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  async load(): Promise<void> {
    const tasks = await Task.find().exec();
    tasks.forEach((task) => {
      const newListItem = new ListItem(task.id, task.item, task.checked);
      this._list.push(newListItem);
    });
  }

  async save(): Promise<void> {
    await Task.deleteMany({});
    this._list.forEach(async (item) => {
      const newTask = new Task({
        id: item.id,
        item: item.item,
        checked: item.checked,
      });
      await newTask.save();
    });
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addItem(itemObj: ListItem): void {
    const duplicateItem = this._list.find(
      (item) => item.item.toLowerCase() === itemObj.item.toLowerCase()
    );
    if (duplicateItem) {
      alert("This item is already in the list.");
      return;
    }
    this._list.push(itemObj);
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
