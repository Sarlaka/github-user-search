import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import {StyleSheetTestUtils} from 'aphrodite';

import {SearchContainer} from './';

describe('Component: SearchContainer', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  describe('when the search prop is not present', () => {
    it('should not call the search action', () => {
      const spy = jest.fn();
      shallow(
        <SearchContainer
          search={''}
          searchUser={spy}
          onSubmit={jest.fn()}
          userEntities={{}}
          userIds={[]}
          totalResults={0}
        />
      );
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('when the search prop is present', () => {
    it('should call the search action', () => {
      const spy = jest.fn();
      shallow(
        <SearchContainer
          search={'?q=test'}
          searchUser={spy}
          onSubmit={jest.fn()}
          userEntities={{}}
          userIds={[]}
          totalResults={0}
        />
      );
      expect(spy.mock.calls[0]).toMatchSnapshot();
    });
  });

  describe('when the search prop changes', () => {
    it('should call the search action with the new value', () => {
      const spy = jest.fn();
      const wrapper = shallow(
        <SearchContainer
          search={'?q=test'}
          searchUser={spy}
          onSubmit={jest.fn()}
          userEntities={{}}
          userIds={[]}
          totalResults={0}
        />
      );
      expect(spy.mock.calls[0]).toMatchSnapshot();
      wrapper.setProps({search: '?q=foobar'});
      expect(spy.mock.calls[1]).toMatchSnapshot();
    });
  });

  describe('when the searchTerm is falsey', () => {
    it('should not render the pagination or results', () => {
      const spy = jest.fn();
      const component = renderer.create(
        <SearchContainer
          search={'?q=test'}
          searchTerm={''}
          searchUser={spy}
          onSubmit={jest.fn()}
          userEntities={{}}
          userIds={[]}
          totalResults={0}
        />
      );
      expect(component).toMatchSnapshot();
    });
  });

});