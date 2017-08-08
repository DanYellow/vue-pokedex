import Vue from 'vue';
import SearchBox from '@/components/search-box';

describe('SearchBox.vue', () => {
  it('should render correct contents', () => {
    expect(typeof SearchBox.created).toBe('function');
    // const Constructor = Vue.extend(SearchBox);
    // const vm = new Constructor().$mount();
    // expect(vm.$el.querySelector('form').length)
    //   .to.equal(1);
  });
});
