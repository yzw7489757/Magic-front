<template>
    <div class="y-select yselect">
        <li @click="toggleMenu()" class="dropdown-toggle" :class="{'noSelected':noSelected }">
          <p class="y-select-content">{{noSelected ? (placeholder || '...') : getCurrentLabel }} &nbsp;</p>
          <span class="caret" :class="{'opened':showMenu}"></span>
        </li>

        <ul class="dropdown-menu" v-show="showMenu">
            <li v-for="(option, idx) in options" :key="option.value" :class='{"active": option.value === value}'>
                <a href="javascript:void(0)" @click="updateOption(option,idx)">
                    {{ option.label }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import Emitter from '@/mixins/emitter'
export default {
  data() {
    return {
      showMenu: false,
      defaultValue: this.value
    }
  },
  mixins: [Emitter],
  props: {
    options: {
      type: Array
    },
    value: {
      type: [String, Number],
      default: () => ''
    },
    placeholder: {
      type: String,
      default: () => ''
    },
    closeOnOutsideClick: {
      type: [Boolean],
      default: () => true
    }
  },
  computed: {
    noSelected() {
      return this.value === undefined || this.value === null
    },
    getCurrentLabel() {
      const selectedItem = this.options.find(item => item.value === this.value)
      return selectedItem ? selectedItem.label : ' '
    }
  },
  watch: {
    value(val) {
      this.defaultValue = val
    }
  },
  mounted() {
    if (this.closeOnOutsideClick) {
      document.addEventListener('click', this.clickHandler)
    }
  },

  beforeDestroy() {
    document.removeEventListener('click', this.clickHandler)
  },

  methods: {
    updateOption(option) {
      this.showMenu = false
      this.$emit('input', option.value)
      this.$emit('onChange', option.value, option)
      this.dispatch('y-form-item', 'on-form-change', option.value)
    },

    toggleMenu() {
      // console.log('this.showMenu: ', this.showMenu)
      // if (this.showMenu) {
      //   this.dispatch('y-form-item', 'on-form-blur', this.value)
      // }
      this.showMenu = !this.showMenu
    },

    clickHandler(event) {
      const { target } = event
      const { $el } = this
      if (!$el.contains(target)) {
        if (this.showMenu) {
          this.dispatch('y-form-item', 'on-form-blur', this.value)
        }
        this.showMenu = false
      }
    }
  }
}
</script>

<style scoped lang="scss">

.y-select {
  min-width: 160px;
  height: 40px;
  position: relative;
  margin: 10px 1px;
  display: inline-block;
  vertical-align: middle;
  &-content{
    min-height: 1em;
    white-space: nowrap;
    overflow:hidden;
  }
}

.dropdown-toggle {
  color: #636b6f;
  min-width: 160px;
  padding: 10px 20px 10px 10px;
  text-transform: none;
  font-weight: 300;
  margin-bottom: 7px;
  // border: 1px solid #ddd;
  // border-radius: 4px;
  background-image: linear-gradient(#009688, #009688), linear-gradient(#D2D2D2, #D2D2D2);
  background-size: 0 2px, 100% 1px;
  background-repeat: no-repeat;
  background-position: center bottom, center calc(100% - 1px);
  background-color: transparent;
  transition: background-color .3s ease-out,color .3s ease-in;
  float: none;
  box-shadow: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  &.noSelected{
    color: rgba(0,0,0,.25);
  }
  &:hover {
    background-color: #eee;
    cursor: pointer;
  }
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  max-height:250px;
  overflow-y:auto;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  font-size: 14px;
  text-align: left;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
  & > li {
    overflow: hidden;
    width: 100%;
    position: relative;
    margin: 0;
    &.active > a{
      color: #409FCB;
    }
    & > a {
      padding: 10px 30px;
      display: block;
      clear: both;
      font-weight: normal;
      line-height: 1.6;
      color: #333333;
      white-space: nowrap;
      text-decoration: none;
      &:hover {
        background: #efefef;
      }
    }
  }
}

.caret {
  width: 0;
  position: absolute;
  top: 19px;
  height: 0;
  margin-left: -24px;
  vertical-align: middle;
  border-top: 4px dashed ;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent ;
  transform: rotate(90deg);
  right: 10px;
  transition: transform .3s;
  &.opened{
    transform: rotate(0deg);
  }
}

</style>
