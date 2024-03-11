import { Application, ApplicationContext } from "compass-core";
import { MinionsView } from "../widget/MinionsView";
import { MainWindow } from "../window/MainWindow";
import manifest from "../../manifest.json";

export class ExampleApplication extends Application {
  public constructor() {
    super(manifest);
  }

  onInstall(applicationContext: ApplicationContext): void {
    super.onInstall(applicationContext);

    applicationContext
      .getViewFactoryRegistry().registryViewClass("MinionsView", MinionsView);

    applicationContext.createApplicationFrame()
      .attachApplicationFrameWindow(new MainWindow());
  }
}
