import { getSchemaType } from "./schema";
import fields from '../components/fields'
import widgets from '../components/widgets'

const widgetMap = {
  boolean: {
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
    widgets: widgets
  }
}

export function getWidgetType(schema) {
  if (schema.widget) {
    return schema.widget
  }
  if (schema.enum) {
    return 'radio'
  }
  return 'text'
}

export function getWidget(schema) {
  const type = getSchemaType(schema)
  const widget = getWidgetType(schema)
  const { widgets } = getDefaultRegistry()
  return widgets[widgetMap[type][widget]]
}