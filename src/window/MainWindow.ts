import { ApplicationWindow, Button, View } from "compass-core";
import { DragViewHelper } from "../utils/DragViewHelper";
import MainWindowLayout from "../res/window/main-window.xml";

export class MainWindow extends ApplicationWindow {
  public onCreate(): void {
    super.onCreate();
    this.setContentXML(MainWindowLayout);
  }

  public onResume(): void {
    super.onResume();
    const minions = <View> this.createViewQuery().findViewById("minions");
    const model = <View> this.createViewQuery().findViewById("model");
    const confirm = <Button> this.createViewQuery().findViewById("confirm");

    confirm.setOnClickListener({
      onClick(v: View): void {
        alert("click");
      },
    });
    DragViewHelper.make(model);
    DragViewHelper.make(minions);
  }
}
