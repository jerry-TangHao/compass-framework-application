import {
  ApplicationWindow,
  Button,
  View,
  TranslateAnimation,
  Animation,
} from "compass-core";

import MainWindowLayout from "../res/window/main-window.xml";

export class MainWindow extends ApplicationWindow {
  public onCreate(): void {
    super.onCreate();

    // Load layout file
    this.setContentXML(MainWindowLayout);
  }

  public onResume(): void {
    super.onResume();

    // Query view component
    const minions = <View> this.createViewQuery().findViewById("minions");
    const model = <View> this.createViewQuery().findViewById("model");
    const confirm = <Button> this.createViewQuery().findViewById("confirm");
    const cancel = <Button> this.createViewQuery().findViewById("cancel");

    confirm.setOnClickListener({
      onClick(v: View): void {
        alert(0);
      },
    });
    cancel.setOnClickListener({
      onClick(v: View): void {
        let translateAnimation = new TranslateAnimation(
          Animation.RELATIVE_TO_SELF, 0,
          Animation.RELATIVE_TO_SELF, 2,
          Animation.RELATIVE_TO_SELF, 0,
          Animation.RELATIVE_TO_SELF, 0,
        );
        translateAnimation.setDuration(3000);
        model.startAnimation(translateAnimation);
      },
    });
  }
}
