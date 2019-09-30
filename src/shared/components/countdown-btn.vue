<template>
  <button type="button" @click="onClick" :disabled="timer > 0 || disabled">{{btnText}}</button>
</template>

<script>
export default {
  props: {
    duration: {
      default: 90,
      type: Number
    },
    text: {
      required: true,
      type: String
    },
    cdText: {
      default: '{time}秒后重试',
      type: String
    },
    cdOverText: {
      default: '',
      type: String
    },
    interval: {
      default: 1,
      type: Number
    },
    disabled: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      timer: 0,
      intervalId: null
    }
  },
  methods: {
    onClick (e) {
      if (this.timer > 0 || this.disabled) {
        return
      }

      this.countdown()
      this.$emit('click', e, () => {
        this.stop()
      })
    },
    countdown () {
      if (this.intervalId) { clearInterval(this.intervalId) }

      this.timer = this.$props.duration
      this.intervalId = setInterval(() => {
        this.timer -= this.$props.interval
        if (this.timer < 0) { this.timer = 0 }
        if (this.timer === 0) {
          clearInterval(this.intervalId)
        }
      }, this.$props.interval * 1000)
    },
    stop () {
      clearInterval(this.intervalId)
      this.timer = 0
    }
  },
  computed: {
    btnText () {
      if (this.timer > 0) {
        return this.$props.cdText.replace(/\{time\}/g, this.timer)
      } else {
        if (this.intervalId && this.$props.cdOverText.trim().length > 0) {
          return this.$props.cdOverText
        } else {
          return this.$props.text
        }
      }
    }
  },
  beforeDestroy () {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }
}
</script>
