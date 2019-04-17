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
    widgets: widgets,
    definitions: {},
    formContext: {},
  };
}

export function getWidget(schema, widget, registeredWidgets = {}) {
  const type = getSchemaType(schema);
  return registeredWidgets[widgetMap[type][widget]];
}