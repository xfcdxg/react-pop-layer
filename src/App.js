import React from 'react'
import popPage from './lib'

import './App.css';

const DemoPage = ({ handleContainerClose }) => (
  <div
    style={{
      color: '#fff',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
   <span onClick={ handleContainerClose }>点我关闭</span>
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {}
  handleShowPage() {
    popPage(<div />, { bgColor: 'green' })
  }
  handleShowPageFromLeft() {
    popPage(<div />, { bgColor: 'red', target: 'left' })
  }
  handleShowPageFromUp() {
    popPage(<div />, { bgColor: 'pink', target: 'up' })
  }
  handleShowPageFromDown() {
    popPage(<div />, { bgColor: 'gray', target: 'down' })
  }
  handleShowPageAndChangeClosePosition() {
    popPage(<div />, { bgColor: 'green', target: 'left', closePosition: 'left' })
  }
  handleShowPageAndCloseCustomize() {
    const closeStyle={
      position: 'relative',
      padding: '20px',
      top: '20px'
    }
    popPage(
      <div />,
      {
        bgColor: 'green',
        closeComponent: <span style={closeStyle}>关闭</span>
      }
    )
  }
  handleShowPageWithoutHistory() {
    popPage(<div />, { bgColor: 'green', enableHash: false })
  }
  handleShowPageWithoutClose() {
    popPage(<div />, { bgColor: 'green', enableClose: false })
  }
  handleShowPageWithContentClose() {
    popPage(<DemoPage />, { bgColor: 'black', enableClose: false })
  }
  handleShowPageCloseWithProcess() {
    popPage(<div />, { bgColor: 'black', handleClose: () => alert('正在被关闭') })
  }
  handleShowNestedPage(count = 1) {
    const Page = ({ pageCount }) => (
      <div>
        弹出层：{ pageCount }
        <button onClick={ () => this.handleShowNestedPage(pageCount + 1) }>弹出第{ pageCount + 1 }层</button>
        <button onClick={ () => window.history.back() }>{ pageCount === 1 ? '关闭' : '返回上一层' }</button>
      </div>
    )
    popPage(<Page pageCount={ count } />)
  }
  render() {
    return (
      <div>
        <button onClick={ this.handleShowPage.bind(this) }>右侧弹出Page</button>

        <button onClick={ this.handleShowPageFromLeft.bind(this) }>左侧弹出Page</button>

        <button onClick={ this.handleShowPageFromUp.bind(this) }>上方弹出Page</button>

        <button onClick={ this.handleShowPageFromDown.bind(this) }>下方弹出Page</button>

        <button onClick={ this.handleShowPageAndChangeClosePosition.bind(this) }>改变关闭的位置</button>

        <button onClick={ this.handleShowPageAndCloseCustomize.bind(this) }>自定义关闭按钮</button>

        <button onClick={ this.handleShowPageCloseWithProcess.bind(this) }>关闭后处理逻辑</button>

        <button onClick={ this.handleShowPageWithoutClose.bind(this) }>不展示关闭按钮</button>

        <button onClick={ this.handleShowPageWithoutHistory.bind(this) }>不记录浏览器历史</button>

        <button onClick={ this.handleShowPageWithContentClose.bind(this) }>内嵌页面自定义关闭</button>

        <button onClick={ () => this.handleShowNestedPage() }>多层Page</button>

      </div>
    )
  }
}
export default App;
