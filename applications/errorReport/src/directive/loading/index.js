import loadingCom from '@/components/loading/index.vue';
import Vue from 'vue';

export default {
  bind: (el, binding) => {
    const text = el.getAttribute('loading-text') || '';
    const bg = el.getAttribute('loading-background') || '';
    const templateWrap = document.createElement('div');
    templateWrap.className = 'y-loading';
    templateWrap.style.backgroundColor = bg || '#fff';
    if (text) {
      const templateText = document.createElement('p');
      templateText.innerText = text;
      templateText.className = 'y-loading-text';
      templateWrap.appendChild(templateText);
    }
    // const round = document.createElement('div')
    // round.className = 'y-loading-round'
    const Round = Vue.extend({
      components: { loadingCom },
      render(h) {
        return h('loadingCom', {});
      },
    });
    const newRound = new Round();
    const vm = newRound.$mount();
    const loadingEl = vm.$el;
    templateWrap.appendChild(loadingEl);

    el.loadingElement = templateWrap;
    const curStyle = window.getComputedStyle(el);
    const { position } = curStyle;

    if (position === 'absolute' || position === 'relative') {
      el.style.position = position;
    } else {
      el.style.position = 'relative';
    }
    if (binding.value) {
      el.appendChild(templateWrap);
    }
  },
  update: (el, binding) => {
    if (binding.value) {
      if (el.loadingElement.parentNode === null) {
        el.appendChild(el.loadingElement);
      }
    } else {
      if (el === el.loadingElement.parentNode) {
        el.removeChild(el.loadingElement);
      }
    }
  },
  unbind: el => {
    if (el.loadingElement.parentNode === el) {
      el.removeChild(el.loadingElement);
    }
    el.loadingElement = null;
  },
};
