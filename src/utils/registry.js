import tree from '../components/tree'
import fields from '../components/fields'
import widgets from '../components/widgets'

const widgetMap = {
  boolean: {
    text: "TextWidget",
    switch: "SwitchWidget"
  },
  string: {
    text: "TextWidget",
    radio: "RadioWidget",
    textarea: "TextAreaWidget"
  },
  integer: {
    text: "TextWidget",
    step: "StepWidget",
    radio: "RadioWidget"
  }
}

export function getDefaultRegistry() {
  return {
    fields: fields,
    widgets: widgets,
    tree: tree
  }
}

export function getWidgetType(schema) {
  return schema.widget || (schema.enum && 'radio') || 'text'
}

export function getWidget(schema) {
  const widget = getWidgetType(schema)
  const { widgets } = getDefaultRegistry()
  return widgets[widgetMap[schema.type][widget]]
}