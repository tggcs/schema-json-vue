export const eventbus = (() => {
  const _bus = {}
  return {
    init: (key, vm) => {
      _bus[key] = vm
    },
    $on: (bus, key, fun) => {
      _bus[bus].$on(key, res => {
        fun(res)
      })
    },
    $emit: (bus, key, val) => {
      _bus[bus].$emit(key, val)
    }
  }
})()

// 校验结果
export let errors = {}
