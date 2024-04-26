# Canvas ui render system (UI渲染系统)

## Building UI using XML (使用XML构建界面)
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<FrameLayout
    background="rgba(1,1,1,0.6)"
    layout_width="match_parent"
    layout_height="match_parent">

    <!--小黄人-->
    <MinionsView
        id="@+id/minions"
        layout_gravity="center_vertical"
        layout_width="300px"
        layout_height="500px"/>

    <LinearLayout
        id="@+id/model"
        background="corners(#ffffff, 10px)"
        orientation="vertical"
        padding="20px"
        layout_gravity="center"
        layout_width="400px"
        layout_height="wrap_content">

        <!-- title部分-->
        <FrameLayout
            paddingTop="5px"
            paddingBottom="5px"
            layout_width="match_parent"
            layout_height="wrap_content">

            <TextView
                text="Title"
                textSize="18px"/>

        </FrameLayout>

        <!--body部分-->
        <FrameLayout
            layout_width="match_parent"
            layout_height="wrap_content">

            <TextView
                text="Some contents..."
                textSize="15px"
                textColor="#000000"
                layout_width="match_parent"/>

        </FrameLayout>

        <!--bottom部分-->
        <FrameLayout
            layout_width="match_parent"
            layout_height="wrap_content">

            <LinearLayout
                gravity="right"
                layout_width="match_parent"
                layout_height="wrap_content">

                <Button
                    id="@+id/cancel"
                    text="取 消"
                    background="corners(#ffffff, #e0e0e0, 6px, 1px)"
                    textSize="14px"
                    paddingLeft="14px"
                    paddingRight="14px"
                    paddingTop="5px"
                    paddingBottom="5px"
                    textColor="#000000"
                    layout_width="wrap_content"
                    layout_height="wrap_content"
                    layout_marginRight="10px"/>

                <Button
                    id="@+id/confirm"
                    background="corners(#4096ff, 6px)"
                    text="确 定"
                    textSize="14px"
                    paddingLeft="14px"
                    hover="corners(red, 6px)"
                    paddingRight="14px"
                    paddingTop="5px"
                    paddingBottom="5px"
                    textColor="#ffffff"
                    layout_width="wrap_content"
                    layout_height="wrap_content"/>

            </LinearLayout>

        </FrameLayout>

    </LinearLayout>

</FrameLayout>
```

## Example (演示图片)
![image](https://github.com/jerry-TangHao/compass-framework-application/assets/22467037/7f60d57a-7842-4acb-b9b8-57d334ea73ed)

## Document (文档地址)
http://doc.compass-framework.com
