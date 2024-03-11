import {
  Canvas,
  AttributeSet,
  Color,
  Path,
  Context,
  Rect,
  Paint,
  View,
  CornerPathEffect,
} from "compass-core";

export class MinionsView extends View {
  public static BODY_SCALE = 0.6; // 身体主干占整个view的比重
  public static BODY_WIDTH_HEIGHT_SCALE = 0.6; // 身体的比例设定为 w:h = 3:5

  protected _bodyWidth = 0;
  protected _bodyHeight = 0;
  protected _pts = new Array(20).fill(0);// 5 条线
  protected _path = new Path();
  protected _strokeWidth = 4; // 描边宽度
  protected _offset; // 计算时，部分需要 考虑描边偏移
  protected _radius; // 身体上下半圆的半径
  protected _colorStroke = Color.BLACK;
  protected _paint = new Paint();
  protected _rect = new Rect();
  protected _bodyRect = new Rect();
  protected _handsHeight = 0;// 计算出吊带的高度时，可以用来做手的高度
  protected _footHeight = 0; // 脚的高度，用来画脚部阴影时用
  protected _colorClothes = Color.rgb(32, 116, 160); // 衣服的颜色
  protected _colorBody = Color.rgb(249, 217, 70); // 身体的颜色

  protected _initParams(): void {
    this._bodyWidth = Math.min(this.getWidth(), this.getHeight() * MinionsView.BODY_WIDTH_HEIGHT_SCALE) * MinionsView.BODY_SCALE;
    this._bodyHeight = Math.min(this.getWidth(), this.getHeight() * MinionsView.BODY_WIDTH_HEIGHT_SCALE) / MinionsView.BODY_WIDTH_HEIGHT_SCALE * MinionsView.BODY_SCALE;

    this._strokeWidth = Math.max(this._bodyWidth / 50, this._strokeWidth);
    this._offset = this._strokeWidth / 2;

    this._bodyRect.setLeft((this.getWidth() - this._bodyWidth) / 2);
    this._bodyRect.setTop((this.getHeight() - this._bodyHeight) / 2);
    this._bodyRect.setRight(this._bodyRect.getLeft() + this._bodyWidth);
    this._bodyRect.setBottom(this._bodyRect.getTop() + this._bodyHeight);

    this._radius = this._bodyWidth / 2;
    this._footHeight = this._radius * 0.4333;

    this._handsHeight = (this.getHeight() + this._bodyHeight) / 2 + this._offset - this._radius * 1.65;
  }

  protected _drawClothes(canvas: Canvas): void {
    this._rect.setLeft((this.getWidth() - this._bodyWidth) / 2 + this._offset);
    this._rect.setTop((this.getHeight() + this._bodyHeight) / 2 - this._radius * 2 + this._offset);
    this._rect.setRight(this._rect.getLeft() + this._bodyWidth - this._offset * 2);
    this._rect.setBottom(this._rect.getTop() + this._radius * 2 - this._offset * 2);

    this._paint.setColor(this._colorClothes);
    this._paint.setStyle(Paint.Style.FILL);
    this._paint.setStrokeWidth(this._strokeWidth);
    canvas.drawArc(this._rect, 0, 180, true, this._paint);

    let h = (this._radius * 0.5);
    let w = (this._radius * 0.3);

    this._rect.setLeft(this._rect.getLeft() + w);
    this._rect.setTop(this._rect.getTop() + this._radius - h);
    this._rect.setRight(this._rect.getRight() - w);
    this._rect.setBottom(this._rect.getTop() + h);

    canvas.drawRect(this._rect, this._paint);

    // 画横线，可优化：用 Path 来绘制，每个点用 rLineTo 去连接
    this._paint.setColor(this._colorStroke);
    this._paint.setStyle(Paint.Style.FILL);
    this._paint.setStrokeWidth(this._strokeWidth);

    this._pts[0] = this._rect.getLeft() - w;
    this._pts[1] = this._rect.getTop() + h;
    this._pts[2] = this._pts[0] + w;
    this._pts[3] = this._pts[1];

    this._pts[4] = this._pts[2];
    this._pts[5] = this._pts[3] + this._offset;
    this._pts[6] = this._pts[4];
    this._pts[7] = this._pts[3] - h;

    this._pts[8] = this._pts[6] - this._offset;
    this._pts[9] = this._pts[7];
    this._pts[10] = this._pts[8] + (this._radius - w) * 2;
    this._pts[11] = this._pts[9];

    this._pts[12] = this._pts[10];
    this._pts[13] = this._pts[11] - this._offset;
    this._pts[14] = this._pts[12];
    this._pts[15] = this._pts[13] + h;

    this._pts[16] = this._pts[14] - this._offset;
    this._pts[17] = this._pts[15];
    this._pts[18] = this._pts[16] + w;
    this._pts[19] = this._pts[17];
    canvas.drawLines(this._pts, this._paint);

    // 画左吊带
    this._paint.setColor(this._colorClothes);
    this._paint.setStrokeWidth(this._strokeWidth);
    this._paint.setStyle(Paint.Style.FILL);
    this._path.reset();
    this._path.moveTo(this._rect.getLeft() - w - this._offset, this._handsHeight);
    this._path.lineTo(this._rect.getLeft() + h / 4, this._rect.getTop() + h / 2);
    let smallW = w / 2 * Math.sin(Math.PI / 4);
    this._path.lineTo(this._rect.getLeft() + h / 4 + smallW, this._rect.getTop() + h / 2 - smallW);
    let smallW2 = w / Math.sin(Math.PI / 4) / 2;
    this._path.lineTo(this._rect.getLeft() - w - this._offset, this._handsHeight - smallW2);
    canvas.drawPath(this._path, this._paint);

    this._paint.setColor(this._colorStroke);
    this._paint.setStrokeWidth(this._strokeWidth);
    this._paint.setStyle(Paint.Style.STROKE);
    canvas.drawPath(this._path, this._paint);
    this._paint.setStyle(Paint.Style.FILL_AND_STROKE);
    canvas.drawCircle(this._rect.getLeft() + h / 5, this._rect.getTop() + h / 4, this._strokeWidth * 0.7, this._paint);

    // 画右吊带，代码和左吊带差不多，坐标对称
    this._paint.setColor(this._colorClothes);
    this._paint.setStrokeWidth(this._strokeWidth);
    this._paint.setStyle(Paint.Style.FILL);
    this._path.reset();
    this._path.moveTo(this._rect.getLeft() - w + 2 * this._radius - this._offset, this._handsHeight);
    this._path.lineTo(this._rect.getRight() - h / 4, this._rect.getTop() + h / 2);
    this._path.lineTo(this._rect.getRight() - h / 4 - smallW, this._rect.getTop() + h / 2 - smallW);
    this._path.lineTo(this._rect.getLeft() - w + 2 * this._radius - this._offset, this._handsHeight - smallW2);

    canvas.drawPath(this._path, this._paint);
    this._paint.setColor(this._colorStroke);
    this._paint.setStrokeWidth(this._strokeWidth);
    this._paint.setStyle(Paint.Style.STROKE);
    canvas.drawPath(this._path, this._paint);

    this._paint.setStyle(Paint.Style.FILL_AND_STROKE);
    canvas.drawCircle(this._rect.getRight() - h / 5, this._rect.getTop() + h / 4, this._strokeWidth * 0.7, this._paint);

    // 中间口袋
    this._paint.setColor(this._colorStroke);
    this._paint.setStrokeWidth(this._strokeWidth);
    this._paint.setStyle(Paint.Style.STROKE);

    this._path.reset();
    let radiusBigPocket = w / 2.0;
    this._path.moveTo(this._rect.getLeft() + 1.5 * w, this._rect.getBottom() - h / 4);
    this._path.lineTo(this._rect.getRight() - 1.5 * w, this._rect.getBottom() - h / 4);
    this._path.lineTo(this._rect.getRight() - 1.5 * w, this._rect.getBottom() + h / 4);
    this._path.addArc(this._rect.getRight() - 1.5 * w - radiusBigPocket * 2, this._rect.getBottom() + h / 4 - radiusBigPocket, this._rect.getRight() - 1.5 * w, this._rect.getBottom() + h / 4 + radiusBigPocket, 0, 90);
    this._path.lineTo(this._rect.getLeft() + 1.5 * w + radiusBigPocket, this._rect.getBottom() + h / 4 + radiusBigPocket);

    this._path.addArc(this._rect.getLeft() + 1.5 * w, this._rect.getBottom() + h / 4 - radiusBigPocket, this._rect.getLeft() + 1.5 * w + 2 * radiusBigPocket, this._rect.getBottom() + h / 4 + radiusBigPocket, 90, 90);
    this._path.lineTo(this._rect.getLeft() + 1.5 * w, this._rect.getBottom() - h / 4 - this._offset);
    canvas.drawPath(this._path, this._paint);

    // 下边一竖，分开裤子
    canvas.drawLine(this._bodyRect.getLeft() + this._bodyWidth / 2, this._bodyRect.getBottom() - h * 0.8, this._bodyRect.getLeft() + this._bodyWidth / 2, this._bodyRect.getBottom(), this._paint);
    // 左边的小口袋
    let radiusSmallPocket = w * 1.2;
    canvas.drawArc(this._bodyRect.getLeft() - radiusSmallPocket, this._bodyRect.getBottom() - this._radius - radiusSmallPocket,
      this._bodyRect.getLeft() + radiusSmallPocket, this._bodyRect.getBottom() - this._radius + radiusSmallPocket, 80, -60, false, this._paint);
    // 右边小口袋
    canvas.drawArc(this._bodyRect.getRight() - radiusSmallPocket, this._bodyRect.getBottom() - this._radius - radiusSmallPocket,
      this._bodyRect.getRight() + radiusSmallPocket, this._bodyRect.getBottom() - this._radius + radiusSmallPocket, 100, 60, false, this._paint);
  }

  protected _drawFeet(canvas: Canvas): void {
    this._paint.setStrokeWidth(this._strokeWidth);
    this._paint.setColor(this._colorStroke);
    this._paint.setStyle(Paint.Style.FILL_AND_STROKE);

    let radiusFoot = this._radius / 3 * 0.4;
    let leftFootStartX = this._bodyRect.getLeft() + this._radius - this._offset * 2;
    let leftFootStartY = this._bodyRect.getBottom() - this._offset;
    let footWidthA = this._radius * 0.5;// 脚宽度大-到半圆结束
    let footWidthB = footWidthA / 3;// 脚宽度-比较细的部分

    // 左脚
    this._path.reset();
    this._path.moveTo(leftFootStartX, leftFootStartY);
    this._path.lineTo(leftFootStartX, leftFootStartY + this._footHeight);
    this._path.lineTo(leftFootStartX - footWidthA + radiusFoot, leftFootStartY + this._footHeight);

    this._rect.setLeft(leftFootStartX - footWidthA);
    this._rect.setTop(leftFootStartY + this._footHeight - radiusFoot * 2);
    this._rect.setRight(this._rect.getLeft() + radiusFoot * 2);
    this._rect.setBottom(this._rect.getTop() + radiusFoot * 2);
    this._path.addArc(this._rect, 90, 180);
    this._path.lineTo(this._rect.getLeft() + radiusFoot + footWidthB, this._rect.getTop());
    this._path.lineTo(this._rect.getLeft() + radiusFoot + footWidthB, leftFootStartY);
    this._path.lineTo(leftFootStartX, leftFootStartY);
    canvas.drawPath(this._path, this._paint);

    // 右脚
    let rightFootStartX = this._bodyRect.getLeft() + this._radius + this._offset * 2;
    let rightFootStartY = leftFootStartY;
    this._path.reset();
    this._path.moveTo(rightFootStartX, rightFootStartY);
    this._path.lineTo(rightFootStartX, rightFootStartY + this._footHeight);
    this._path.lineTo(rightFootStartX + footWidthA - radiusFoot, rightFootStartY + this._footHeight);

    this._rect.setLeft(rightFootStartX + footWidthA - radiusFoot * 2);
    this._rect.setTop(rightFootStartY + this._footHeight - radiusFoot * 2);
    this._rect.setRight(this._rect.getLeft() + radiusFoot * 2);
    this._rect.setBottom(this._rect.getTop() + radiusFoot * 2);
    this._path.addArc(this._rect, 90, -180);
    this._path.lineTo(this._rect.getRight() - radiusFoot - footWidthB, this._rect.getTop());
    this._path.lineTo(this._rect.getRight() - radiusFoot - footWidthB, rightFootStartY);
    this._path.lineTo(rightFootStartX, rightFootStartY);
    canvas.drawPath(this._path, this._paint);
  }

  protected _drawBody(canvas: Canvas): void {
    this._paint.setColor(this._colorBody);
    this._paint.setStyle(Paint.Style.FILL);
    canvas.drawRoundRect(this._bodyRect, this._radius, this._radius, this._radius, this._radius, this._paint);
  }

  protected _drawBodyStroke(canvas: Canvas): void {
    this._paint.setColor(this._colorStroke);
    this._paint.setStrokeWidth(this._strokeWidth);
    this._paint.setStyle(Paint.Style.STROKE);
    canvas.drawRoundRect(this._bodyRect, this._radius, this._radius, this._radius, this._radius, this._paint);
  }

  protected _drawEyesMouth(canvas: Canvas): void {
    // 眼睛中心处于上半圆直径 往上的高度偏移
    let eyesOffset = this._radius * 0.1;
    this._paint.setStrokeWidth(this._strokeWidth * 5);

    // 计算眼镜带弧行的半径 分两段，以便眼睛中间有隔开的效果
    let radiusGlassesRibbon = (this._radius / Math.sin(Math.PI / 20));
    this._rect.setLeft(this._bodyRect.getLeft() + this._radius - radiusGlassesRibbon);
    this._rect.setTop(this._bodyRect.getTop() + this._radius - (this._radius / Math.tan(Math.PI / 20)) - radiusGlassesRibbon - eyesOffset);
    this._rect.setRight(this._rect.getLeft() + radiusGlassesRibbon * 2);
    this._rect.setBottom(this._rect.getTop() + radiusGlassesRibbon * 2);
    canvas.drawArc(this._rect, 81, 3, false, this._paint);
    canvas.drawArc(this._rect, 99, -3, false, this._paint);

    // 眼睛半径
    let radiusEyes = this._radius / 3;
    this._paint.setColor(Color.WHITE);
    this._paint.setStrokeWidth(this._strokeWidth);
    this._paint.setStyle(Paint.Style.FILL);

    canvas.drawCircle(this._bodyRect.getLeft() + this._bodyWidth / 2 - radiusEyes - this._offset, this._bodyRect.getTop() + this._radius - eyesOffset, radiusEyes, this._paint);
    canvas.drawCircle(this._bodyRect.getLeft() + this._bodyWidth / 2 + radiusEyes + this._offset, this._bodyRect.getTop() + this._radius - eyesOffset, radiusEyes, this._paint);

    this._paint.setColor(this._colorStroke);
    this._paint.setStyle(Paint.Style.STROKE);
    canvas.drawCircle(this._bodyRect.getLeft() + this._bodyWidth / 2 - radiusEyes - this._offset, this._bodyRect.getTop() + this._radius - eyesOffset, radiusEyes, this._paint);
    canvas.drawCircle(this._bodyRect.getLeft() + this._bodyWidth / 2 + radiusEyes + this._offset, this._bodyRect.getTop() + this._radius - eyesOffset, radiusEyes, this._paint);

    let radiusEyeballBlack = radiusEyes / 3;
    this._paint.setStyle(Paint.Style.FILL);
    canvas.drawCircle(this._bodyRect.getLeft() + this._bodyWidth / 2 - radiusEyes - this._offset, this._bodyRect.getTop() + this._radius - eyesOffset, radiusEyeballBlack, this._paint);
    canvas.drawCircle(this._bodyRect.getLeft() + this._bodyWidth / 2 + radiusEyes + this._offset, this._bodyRect.getTop() + this._radius - eyesOffset, radiusEyeballBlack, this._paint);

    this._paint.setColor(Color.WHITE);
    let radiusEyeballWhite = radiusEyeballBlack / 2;
    canvas.drawCircle(this._bodyRect.getLeft() + this._bodyWidth / 2 - radiusEyes + radiusEyeballWhite - this._offset * 2,
      this._bodyRect.getTop() + this._radius - radiusEyeballWhite + this._offset - eyesOffset,
      radiusEyeballWhite, this._paint);
    canvas.drawCircle(this._bodyRect.getLeft() + this._bodyWidth / 2 + radiusEyes + radiusEyeballWhite,
      this._bodyRect.getTop() + this._radius - radiusEyeballWhite + this._offset - eyesOffset,
      radiusEyeballWhite, this._paint);

    // 画嘴巴，因为位置和眼睛有相对关系，所以写在一块
    this._paint.setColor(this._colorStroke);
    this._paint.setStyle(Paint.Style.STROKE);
    this._paint.setStrokeWidth(this._strokeWidth);
    let radiusMonth = this._radius;
    this._rect.setLeft(this._bodyRect.getLeft());
    this._rect.setTop(this._bodyRect.getTop() - radiusMonth / 2.5);
    this._rect.setRight(this._rect.getLeft() + radiusMonth * 2);
    this._rect.setBottom(this._rect.getTop() + radiusMonth * 2);
    canvas.drawArc(this._rect, 95, -20, false, this._paint);
  }

  protected _drawHands(canvas: Canvas) :void {
    this._paint.setStrokeWidth(this._strokeWidth);
    this._paint.setStyle(Paint.Style.FILL_AND_STROKE);
    this._paint.setColor(this._colorBody);

    // 左手
    this._path.reset();
    let hypotenuse = this._bodyRect.getBottom() - this._radius - this._handsHeight;
    let radiusHand = hypotenuse / 6;
    this._paint.setPathEffect(new CornerPathEffect(radiusHand));

    this._path.moveTo(this._bodyRect.getLeft(), this._handsHeight);
    this._path.lineTo(this._bodyRect.getLeft() - hypotenuse / 2, this._handsHeight + hypotenuse / 2);
    this._path.lineTo(this._bodyRect.getLeft() + this._offset, this._bodyRect.getBottom() - this._radius + this._offset);
    this._path.lineTo(this._bodyRect.getLeft(), this._handsHeight);// 增加兼容性,path没闭合在一起机子上会使手的下面的点没办法与裤子重合
    canvas.drawPath(this._path, this._paint);

    this._paint.setStrokeWidth(this._strokeWidth);
    this._paint.setStyle(Paint.Style.STROKE);
    this._paint.setColor(this._colorStroke);
    canvas.drawPath(this._path, this._paint);

    // 右手
    this._path.reset();
    this._paint.setStyle(Paint.Style.FILL);
    this._paint.setColor(this._colorBody);

    this._path.moveTo(this._bodyRect.getRight(), this._handsHeight);
    this._path.lineTo(this._bodyRect.getRight() + hypotenuse / 2, this._handsHeight + hypotenuse / 2);
    this._path.lineTo(this._bodyRect.getRight() - this._offset, this._bodyRect.getBottom() - this._radius + this._offset);
    this._path.lineTo(this._bodyRect.getRight(), this._handsHeight);
    canvas.drawPath(this._path, this._paint);

    this._paint.setStrokeWidth(this._strokeWidth);
    this._paint.setStyle(Paint.Style.STROKE);
    this._paint.setColor(this._colorStroke);
    canvas.drawPath(this._path, this._paint);

    // 一个慢动作  - -||| 手臂内侧拐点
    this._path.reset();
    this._paint.setStyle(Paint.Style.FILL);
    this._path.moveTo(this._bodyRect.getLeft(), this._handsHeight + hypotenuse / 2 - this._strokeWidth);
    this._path.lineTo(this._bodyRect.getLeft() - this._strokeWidth * 2, this._handsHeight + hypotenuse / 2 + this._strokeWidth * 2);
    this._path.lineTo(this._bodyRect.getLeft(), this._handsHeight + hypotenuse / 2 + this._strokeWidth);
    this._path.lineTo(this._bodyRect.getLeft(), this._handsHeight + hypotenuse / 2 - this._strokeWidth);
    canvas.drawPath(this._path, this._paint);

    this._path.reset();
    this._path.moveTo(this._bodyRect.getRight(), this._handsHeight + hypotenuse / 2 - this._strokeWidth);
    this._path.lineTo(this._bodyRect.getRight() + this._strokeWidth * 2, this._handsHeight + hypotenuse / 2 + this._strokeWidth * 2);
    this._path.lineTo(this._bodyRect.getRight(), this._handsHeight + hypotenuse / 2 + this._strokeWidth);
    this._path.lineTo(this._bodyRect.getRight(), this._handsHeight + hypotenuse / 2 - this._strokeWidth);
    canvas.drawPath(this._path, this._paint);

    this._paint.setPathEffect(null); // 避免影响其它绘制
  }

  protected _drawFeetShadow(canvas: Canvas): void {
    this._paint.setColor(Color.parseColor('#616161'));
    canvas.drawOval(this._bodyRect.getLeft() + this._bodyWidth * 0.15,
      this._bodyRect.getBottom() - this._offset + this._footHeight,
      this._bodyRect.getRight() - this._bodyWidth * 0.15,
      this._bodyRect.getBottom() - this._offset + this._footHeight + this._strokeWidth * 1.3, this._paint);
  }

  public constructor(context: Context, attrs: AttributeSet) {
    super(context, attrs);
  }

  public onLayout(changed: boolean, left: number, top: number, right: number, bottom: number): void {
    super.onLayout(changed, left, top, right, bottom);
    if (changed) {
      this._initParams();
    }
  }

  public onDraw(canvas: Canvas): void {
    super.onDraw(canvas);
    this._drawFeetShadow(canvas); // 阴影
    this._drawFeet(canvas); // 脚
    this._drawHands(canvas); // 手
    this._drawBody(canvas); // 身体
    this._drawClothes(canvas); // 衣服
    this._drawEyesMouth(canvas); // 眼睛,嘴巴
    this._drawBodyStroke(canvas); // 最后画身体的描边，可以摭住一些过渡的棱角
  }
}
