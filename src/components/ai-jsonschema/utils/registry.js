import { getSchemaType } from "./schema";
import fields from '../components/fields'
import widgets from '../components/widgets'

const widgetMap = {
  // boolean: {
  //   checkbox: "CheckboxWidget",
  //   radio: "RadioWidget",
  //   select: "SelectWidget",
  //   hidden: "HiddenWidget",
  // },
  string: {
    text: "TextWidget",
    // password: "PasswordWidget",
    // email: "EmailWidget",
    // hostname: "TextWidget",
    // ipv4: "TextWidget",
    // ipv6: "TextWidget",
    // uri: "URLWidget",
    // "data-url": "FileWidget",
    radio: "RadioWidget",
    // select: "SelectWidget",
    textarea: "TextAreaWidget",
    // hidden: "HiddenWidget",
    // date: "DateWidget",
    // datetime: "DateTimeWidget",
    // "date-time": "DateTimeWidget",
    // "alt-date": "AltDateWidget",
    // "alt-datetime": "AltDateTimeWidget",
    // color: "ColorWidget",
    // file: "FileWidget",
  },
  integer: {
    text: "TextWidget",
    // select: "SelectWidget",
    step: "StepWidget",
    // updown: "UpDownWidget",
    // range: "RangeWidget",
    radio: "RadioWidget",
    // hidden: "HiddenWidget",
  }
  // array: {
  //   select: "SelectWidget",
  //   checkboxes: "CheckboxesWidget",
  //   files: "FileWidget",
  //   hidden: "HiddenWidget",
  // }
};


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
  
  // function mergeOptions(Widget) {
  //   // cache return value as property of widget for proper react reconciliation
  //   if (!Widget.MergedWidget) {
  //     const defaultOptions =
  //       (Widget.defaultProps && Widget.defaultProps.options) || {};
  //     Widget.MergedWidget = ({ options = {}, ...props }) => (
  //       <Widget options={{ ...defaultOptions, ...options }} {...props} />
  //     );
  //   }
  //   return Widget.MergedWidget;
  // }

  // if (typeof widget === "function") {
  //   return mergeOptions(widget);
  // }

  // if (typeof widget !== "string") {
  //   throw new Error(`Unsupported widget definition: ${typeof widget}`);
  // }

  // if (registeredWidgets.hasOwnProperty(widget)) {
  //   const registeredWidget = registeredWidgets[widget];
  //   return getWidget(schema, registeredWidget, registeredWidgets);
  // }

  // if (!widgetMap.hasOwnProperty(type)) {
  //   throw new Error(`No widget for type "${type}"`);
  // }

  // if (widgetMap[type].hasOwnProperty(widget)) {
  //   const registeredWidget = registeredWidgets[widgetMap[type][widget]];
  //   return getWidget(schema, registeredWidget, registeredWidgets);
  // }

  // throw new Error(`No widget "${widget}" for type "${type}"`);
}