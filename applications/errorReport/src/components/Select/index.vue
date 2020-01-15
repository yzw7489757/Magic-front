<template>
    <div class="btn-group">
        <li @click="toggleMenu()" class="dropdown-toggle" :class="{'noSelected':value === undefined}">
          {{value === undefined ? (placeholder || '') : value}}
          <span class="caret"></span>
        </li>

        <ul class="dropdown-menu" v-if="showMenu">
            <li v-for="(option, idx) in options" :key="option.value" :class='{"active": option.value === value}'>
                <a href="javascript:void(0)" @click="updateOption(option,idx)">
                    {{ option.label }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false
    }
  },
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
      console.log('option: ', option)
      this.showMenu = false
      this.$emit('onChange', option.value, option)
    },

    toggleMenu() {
      this.showMenu = !this.showMenu
    },

    clickHandler(event) {
      const { target } = event
      const { $el } = this

      if (!$el.contains(target)) {
        this.showMenu = false
      }
    }
  }
}
</script>

<style scoped lang="scss">

.btn-group {
  min-width: 160px;
  height: 40px;
  position: relative;
  margin: 10px 1px;
  display: inline-block;
  vertical-align: middle;
}
// .btn-group a:hover {
//   text-decoration: none;
// }

.dropdown-toggle {
  color: #636b6f;
  min-width: 160px;
  padding: 10px 20px 10px 10px;
  text-transform: none;
  font-weight: 300;
  margin-bottom: 7px;
  border: 0;
  background-image: linear-gradient(#009688, #009688), linear-gradient(#D2D2D2, #D2D2D2);
  background-size: 0 2px, 100% 1px;
  background-repeat: no-repeat;
  background-position: center bottom, center calc(100% - 1px);
  background-color: transparent;
  transition: background-color .3s ease-out,color .3s ease-in;
  float: none;
  box-shadow: none;
  border-radius: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  &.noSelected{
    color: rgba(0,0,0,.25);
  }
  &:hover {
    background: rgba(0,0,0,.05);
    cursor: pointer;
  }
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
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
  border-top: 4px dashed;
  border-top: 4px solid \9;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  right: 10px;
}

</style>
