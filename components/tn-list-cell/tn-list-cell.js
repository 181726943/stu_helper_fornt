import componentsColorMixin from '../../libs/mixin/components_color.js'

Component({
  name: 'tn-list-cell',
  mixins: [componentsColorMixin],
  properties: {
    // 列表序号
    index: {
      type: String,
      value: '0'
    },
    // 内边距
    padding: {
      type: String,
      value: ''
    },
    // 是否有箭头
    arrow: {
      type: Boolean,
      value: false
    },
    //箭头是否有偏移距离
    arrowRight: {
      type: Boolean,
      value: true
    },
    // 是否有点击效果
    hover: {
      type: Boolean,
      value: false
    },
    // 隐藏线条
    unlined: {
      type: Boolean,
      value: false
    },
    //线条是否有左偏移距离
    lineLeft: {
      type: Boolean,
      value: true
    },
    //线条是否有右偏移距离
    lineRight: {
      type: Boolean,
      value: true
    },
    //是否加圆角
    radius: {
      type: Boolean,
      value: false
    }
  },
  data: {},
  methods: {
    // 处理点击事件
    handleClick() {
      this.triggerEvent("click", {
        index: Number(this.data.index)
      })
      this.triggerEvent("tap", {
        index: Number(this.data.index)
      })
    }
  },
  computed: {
    cellClass() {
      let clazz = ''

      if (this.data.arrow) {
        clazz += ' tn-list-cell--arrow'
        if (!this.data.arrowRight) {
          clazz += ' tn-list-cell--arrow--none-right'
        }
      }

      if (this.data.unlined) {
        clazz += ' tn-list-cell--unlined'
      } else {
        if (this.data.lineLeft) {
          clazz += ' tn-list-cell--line-left'
        }
        if (this.data.lineRight) {
          clazz += ' tn-list-cell--line-right'
        }
      }

      if (this.data.radius) {
        clazz += ' tn-list-cell--radius'
      }

      return clazz
    },
    cellStyle() {
      let style = {}

      if (this.backgroundColorStyle) {
        style.backgroundColor = this.backgroundColorStyle
      }

      if (this.fontColorStyle) {
        style.color = this.fontColorStyle
      }

      if (this.fontSize) {
        style.fontSize = this.fontSize + this.fontUnit
      }

      if (this.data.padding) {
        style.padding = this.data.padding
      }

      return style
    }
  }
})
