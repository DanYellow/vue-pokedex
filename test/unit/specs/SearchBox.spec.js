import Vue from 'vue';

import store from '@/store';

import SearchBox from '@/components/search-box';

describe('SearchBox.vue', () => {
  const Constructor = Vue.extend(SearchBox);
  const SearchBoxComponent = new Constructor({ store }).$mount();
  it('should render correct contents', () => {
    const nbItemInput = Array.from(SearchBoxComponent.$el.querySelectorAll('input')).length;

    expect(typeof SearchBox.created).to.equal('function');
    expect(nbItemInput).to.equal(1);
    expect(SearchBoxComponent.$el.tagName.toLowerCase()).to.equal('form');
  });

  it('should set a filter', () => {
    const searchInput = SearchBoxComponent.$el.querySelector('input');
    searchInput.value = 'kanto';
    const focusEvent = new window.Event('focus');
    const keyboardEvent = new window.Event('keyup');
    keyboardEvent.which = 9;

    searchInput.dispatchEvent(focusEvent);
    searchInput.dispatchEvent(keyboardEvent);
    /* eslint-disable */
    SearchBoxComponent._watcher.run();
    /* eslint-enable */
  });
});
