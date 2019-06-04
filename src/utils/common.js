export function isObject(thing) {
  return typeof thing === "object" && thing !== null && !Array.isArray(thing)
}

export function isDef (thing) {
  return thing !== undefined && thing !== null
}

// eventbus factory
export const eventbus = (() => {
  const _bus = {}
  return {
    init: (bus, vm) => {
      _bus[bus] = vm
    },
    $on: (bus, key, fun) => {
      _bus[bus].$on(key, fun)
    },
    $emit: (bus, key, val) => {
      _bus[bus].$emit(key, val)
    },
    $off: (bus, key, fun) => {
      _bus[bus].$off(key, fun)
    }
  }
})()

// 校验结果
export let errors = {}

export const warn = (msg, data) => {
  console.warn(msg)
  console.log(data)
}
