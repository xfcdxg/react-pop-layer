# react-page-page

React 弹出层组件，函数触发，不污染 DOM。

* 弹出层默认会产生浏览器历史，支持通过浏览器的回退按钮关闭。

### 安装
```
  $ npm install react-pop-page
  // or
  $ yarn add react-pop-page
```

### DEMO
[React-Pop-Page]

### 引用

```js
  import popPage from 'react-pop-page'
```

### 使用方法

##### popPage(ReactNode, props)

```js
  const Layer = <div>content</div>

  // 基础用法
  popPage(Layer)

  // 其他方向弹出
  popPage(Layer, { target: 'up' })    // 上
  popPage(Layer, { target: 'down' })  // 下
  popPage(Layer, { target: 'left' })  // 左
  popPage(Layer, { target: 'right' }) // 右

  // 调整关闭位置
  popPage(Layer, { closePosition: 'left' }) // 右

  // 自定义关闭
  popPage(<div />, { closeComponent: <span>关闭</span> })

  // 隐藏关闭
  popPage(<div />, { enableClose: false })

  // 不启用浏览器历史
  popPage(<div />, { enableHash: true })

  // 关闭时处理逻辑
  popPage(<div />, { handleClose: () => {} })

  // 子组件关闭弹出层
  const ChildPage = ({ handleContainerClose }) => (<div onClick={ handleContainerClose }></div>)

  popPage(<ChildPage />)

```

### 可配置的Props

| 属性 | 类型 | 默认值 | 描述 |
|---|---|---|---|
| mask | Boolean | true | 是否展示遮罩 |
| maskConfig|Object|{}|配置遮罩层，具体配置参考：[React-Page-Mask]|
| target | String| right | 可配置弹出方向，可选项：up / down / left / right
| bgColor | String | #fff| 设置弹出层背景色，同 background-color |
| style | Object | {} | 弹出层的样式 |
| enableHash |Boolean|true| 是否开启记录浏览器历史|
| enableClose|Boolean|true|是否展示关闭区|
| closeComponent|ReactNode|null|自定义关闭按钮|
| closePosition|String|'right'|配置关闭区位置，可选：left/right|
| closeContainerStyle | Object | {} |配置容器的样式|
| handleClose|Function|() => {}|关闭时的处理逻辑|

[React-Page-Mask]:https://github.com/xfcdxg/react-page-mask.git
[React-Pop-Page]:https://xfcdxg.github.io/react-pop-page/
