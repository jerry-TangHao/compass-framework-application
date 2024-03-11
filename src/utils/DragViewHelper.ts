import {
  Interface,
} from "compass-library";

import {
  View,
  MotionEvent,
} from "compass-core";

export class DragViewHelper {
  public static make(dragView: View): DragViewHelper;
  public static make(controllerView: View, dragView: View): DragViewHelper;
  public static make(...parameter: any[]): DragViewHelper {
    switch (parameter.length) {
      case 1: {
        return new DragViewHelper(parameter[0]);
      }
      case 2: {
        return new DragViewHelper(parameter[0], parameter[1]);
      }
    }
  }

  protected _controllerView: View;
  protected _dragView: View;
  protected _downX: number = 0;
  protected _downY: number = 0;
  protected _transX: number = 0;
  protected _transY: number = 0;
  protected _touchListener: View.OnTouchListener;

  public _dragViewHelperInitialize(): void {
    const dragViewThis = this;
    this._controllerView.setOnTouchListener(this._touchListener = new class implements View.OnTouchListener {
      static II = Interface.make(this).implement(View.OnTouchListenerInterface);

      public onTouch(v: View, event: MotionEvent): boolean {
        switch (event.getAction()) {
          case MotionEvent.ACTION_DOWN: {
            dragViewThis._downY = event.getRawY();
            dragViewThis._downX = event.getRawX();
            dragViewThis._transX = dragViewThis._dragView.getTranslationX();
            dragViewThis._transY = dragViewThis._dragView.getTranslationY();
            return true;
          }
          case MotionEvent.ACTION_MOVE: {
            const downY = event.getRawY();
            const downX = event.getRawX();
            const targetX = downX - dragViewThis._downX;
            const targetY = downY - dragViewThis._downY;
            dragViewThis._dragView.setTranslationX(dragViewThis._transX + targetX);
            dragViewThis._dragView.setTranslationY(dragViewThis._transY + targetY);
            return true;
          }
        }
        return false;
      }
    });
  }

  public constructor(dragView: View);
  public constructor(controllerView: View, dragView: View);
  public constructor(...parameter: any[]) {
    switch (parameter.length) {
      case 1: {
        const dragView = parameter[0];
        this._dragView = dragView;
        this._controllerView = dragView;
        this._dragViewHelperInitialize();
        return;
      }
      case 2: {
        const controllerView = parameter[0];
        const dragView = parameter[1];
        this._controllerView = controllerView;
        this._dragView = dragView;
        this._dragViewHelperInitialize();
      }
    }
  }

  public recycle(): void {
    this._controllerView.setOnTouchListener(null);
  }
}
