import React from 'react';
import { shallow } from 'enzyme';

import List from './List';
import { list } from '../../helpers/mockedData';

function shallowSetup() {
  const wrapper = shallow(<List list={list} />);
  return wrapper;
}

describe('renders list without crashing', () => {
  it('should renders properly', () => {
    const wrapper = shallowSetup();
    expect(wrapper.length).toEqual(1);
  });

  it('should recieve state in props', () => {
    const wrapper = shallowSetup();
    const listItemWrapper = wrapper.find('.carousal-item');
    expect(listItemWrapper.length).toEqual(list.length);
  });
  it('should show right arrow initially and should show left arrow after first click on right arrow', () => {
    const wrapper = shallowSetup();
    let leftArrowWrapper = wrapper.find('[data-test="left-arrow"]');
    expect(leftArrowWrapper.length).toEqual(0);

    const rightArrowWrapper = wrapper.find('[data-test="right-arrow"]');
    rightArrowWrapper.simulate('click');

    leftArrowWrapper = wrapper.find('[data-test="left-arrow"]');
    expect(leftArrowWrapper.length).toEqual(1);
  });
  it('should call left and right arrow click handlers respectively', () => {
    const leftArrowHandlerSpy = jest.spyOn(List.prototype, 'leftClick');
    const rightArrowHandlerSpy = jest.spyOn(List.prototype, 'rightClick');
    const wrapper = shallowSetup();
    let leftArrowWrapper = wrapper.find('[data-test="left-arrow"]');
    expect(leftArrowWrapper.length).toEqual(0);
    const rightArrowWrapper = wrapper.find('[data-test="right-arrow"]');
    rightArrowWrapper.simulate('click');
    expect(rightArrowHandlerSpy).toHaveBeenCalled();
    leftArrowWrapper = wrapper.find('[data-test="left-arrow"]');
    leftArrowWrapper.simulate('click');
    expect(leftArrowHandlerSpy).toHaveBeenCalled();
  });
});
