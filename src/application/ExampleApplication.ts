import {
  ApplicationContext,
  Application,
} from "compass-core";

import {
  MinionsView,
} from "../widget/MinionsView";

import {
  MainWindow,
} from "../window/MainWindow";

import manifest from "../../manifest.json";

export class ExampleApplication extends Application {
  public constructor() {
    super(manifest);
  }

  onInstall(applicationContext: ApplicationContext): void {
    super.onInstall(applicationContext);

    // Register custom components
    applicationContext.getViewFactoryRegistry()
      .registryViewClass("MinionsView", MinionsView);

    // Attach MainWindow to ApplicationFrame
    applicationContext.createApplicationFrame()
      .attachApplicationFrameWindow(new MainWindow());
  }
}
