import React from 'react';
import { Button } from '@material-ui/core';

import WeatherCard from '../WeatherCard/WeatherCardHOC';
import './List.scss';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMovement: 0,
      childWidth: 0,
      totalViewedChilds: window.innerWidth > 567 ? 3 : 1,
    }
    this.leftClick = this.leftClick.bind(this);
    this.rightClick = this.rightClick.bind(this);
  }

  componentDidMount() {
    let container = document.querySelector('[data-test="main-container"] .MuiCardContent-root .carousal');
    let width = container ? (container.clientWidth / this.state.totalViewedChilds) : 288;
    if (window.innerWidth < 567) {
      width = container.clientWidth;
    }
    width = Math.floor(width);
    this.setState(()=> ({ childWidth: width }));
  }

  leftClick() {
    let currentIndex  = this.state.currentMovement;
    let shouldNotScroll = (currentIndex - 1) < 0
    if (shouldNotScroll) { return; }
    currentIndex--;
    this.setState(() => ({ currentMovement: currentIndex }));
    const slider = document.getElementsByClassName('carousal-slides')[0];
    const { childWidth } = this.state;
    let width = -1 * (currentIndex * childWidth);
    if (slider && slider.style) {
      slider.style.transform = `translateX(${width}px)`;
    }
  }

  rightClick() {
    let currentIndex  = this.state.currentMovement;
    let shouldScroll = (currentIndex + this.state.totalViewedChilds) < this.props.list.length;
    if (!shouldScroll) { return; }
    currentIndex++
    this.setState(() => ({ currentMovement: currentIndex }));
    const slider = document.getElementsByClassName('carousal-slides')[0];
    const { childWidth } = this.state;
    let width = -1 * (currentIndex * childWidth);
    if (slider && slider.style) {
      slider.style.transform = `translateX(${width}px)`;
    }
  }

  render() {
    const { list } = this.props;
    const { childWidth, currentMovement, totalViewedChilds } = this.state;
    const shouldShowLeftArrow = currentMovement > 0;
    const shouldShowRightArrow = (currentMovement + totalViewedChilds) < list.length;
    const style = {
      minWidth: `${childWidth}px`, width: `${childWidth}px`
    };
    return (
      <div className="carousal">
        <div className="actions">
          <div>
            {
              shouldShowLeftArrow && (
                <Button data-test="left-arrow" onClick={this.leftClick}>&#8592;</Button>
              )
            }
          </div>
          <div>
            {
              shouldShowRightArrow && (
                <Button data-test="right-arrow" onClick={this.rightClick}>&#8594;</Button>
              )
            }
          </div>
        </div>
        <div className="carousal-slides">
          {
            childWidth > 0 && list && list.map((item, index) => (
              <div key={index} className="carousal-item" style={style}>
                <WeatherCard item={item} index={index} width={ childWidth }/>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default List;
