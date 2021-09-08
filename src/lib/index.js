import './index.css'
import React from 'react'
import Mask from 'react-page-mask'

let slidePageList = []
let location = window.location
let history = window.history

const PopPage = (content, options = {}) => {
  const { mask = false, maskConfig, ...props } = options || {}
  Mask(
    <SlidePage { ...props }>
      { content }
    </SlidePage>,
    {
      mask,
      ...maskConfig,
    }
  )
}

const closeSlidePage = slidePages => {
  if (slidePages.length > 0) {
    slidePages.shift().onclose()
    closeSlidePage(slidePages)
  }
}
const matchHashWithSlidePage = () => {
  closeSlidePage(slidePageList.filter(o => location.hash.indexOf(o.hash) < 0))
  refreshSlidePageList()
}
const refreshSlidePageList = () => {
  slidePageList = slidePageList.filter(o => location.hash.indexOf(o.hash) >= 0)
}

const SlidePage = ({
  children,
  bgColor = '#fff',
  target = 'right',
  enableHash = true,
  enableClose = true,
  closePosition = 'right',
  closeContainerStyle = {},
  closeComponent,
  style = {},
  handleClose = () => {},
  handleContainerClose,
}) => {
  const hash = Date.now()
  let node
  const onclose = () => {
    if (enableHash) {
      const hash = node.getAttribute('data-id')
      if (location.hash.indexOf(hash) >= 0) history.go(-1)
    }
    node.className += ' hide'
    node.addEventListener("transitionend", () => {
      handleContainerClose()
      setTimeout(refreshSlidePageList, 0)
    })
  }

  const onload = _node => {
    if(_node) {
      node = _node
      if (enableHash) {
        node.setAttribute('data-id', hash)
        location.hash += hash
        slidePageList.push({ node, hash, onclose })
      }
      setTimeout(() => {
        node.className = node.className.replace(' hide', '')
      }, 50)
    }
  }

  return (
    <div className={ `slide-page-container ${ target } hide` }
         ref={ onload } style={{ backgroundColor: bgColor, ...style }} >
      { children && React.cloneElement(children, { handleContainerClose: onclose }) }
      {
        enableClose && (
          <div className={ `close-container ${ closePosition }` } style={ closeContainerStyle }
               onClick={
                 () => {
                   onclose()
                   typeof handleClose === 'function' && handleClose()
                 }
               }
          >
            { closeComponent ? (closeComponent) : <span className='slide-page-close'>+</span> }
          </div>
        )
      }
    </div>
  )
}

window.addEventListener('hashchange', () => {
  matchHashWithSlidePage()
}, false)

export default PopPage
