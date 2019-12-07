import React, { Component, Fragment } from "react";
import { Button, Form, Message } from "semantic-ui-react";

import "./Form.scss";

/** Handles the rendering of a form, dynamically renders fields based on props.fields
 * @param {object[]} props.fields, required, determines rendered form fields
 * @param {string} messageHeader, optional, base messageHeader value with instructions
 * @param {string} messageValue, optional, base messageContent value with instructions
 * @param {string} messageStatus, optional, updates message color
 * @returns {Component}, Form
 **/

class DynamicForm extends Component {
  /** Triggers logic to dynamically generate inputState
   * @param {object[]} props.fields, required, determines form value state
   * @returns {Component}, Form
   **/

  componentWillMount() {
    let { fields } = this.props;

    if (fields) {
      this.setState({ hasFields: true });

      fields.map((field, index) => {
        return this.inputState(field, index);
      });
    }
  }

  /** Submits the form, handles trigger for POST request to API
   * @dev the argument needs to be re-worked after refactor to parent component
   **/

  submitForm = () => {
    let { addNote } = this.props;
    let { value0, value1 } = this.state;

    if (addNote) {
      addNote(value0, value1);
    }
  };

  /** Creates the input state dynamically, based on passed props.fields data
   * @param {object} fieldObject, contains the .error / .value keys necessary to create form state
   * @param {int} index, number for each object in props.fields, used to create dynamic state uniqueness
   **/

  inputState = (fieldObject, index) => {
    return Object.keys(fieldObject).map(key => {
      // only creates state for the error / value variables
      if (key === "error" || key === "value") {
        // uses index argument to create scalable state for each object in this.fields
        let stateVariable = `${key + index}`;

        // sets the state key name and value
        return this.setState({ [stateVariable]: fieldObject[key] });
      }
      return null;
    });
  };

  /** Handles the change of each field's input, when the user types into a field
   * @dev this is where field level validation could be introduced
   * @param {string} value, new field value
   * @param {string} fieldKey, state.fieldKey, determines which state to update dynamically
   **/

  inputChange = (value, fieldKey) => {
    this.setState({ [fieldKey]: value });
  };

  /** Dynamically renders all fields, based on props.fields
   * @param {object[]} fields, each object contains field name, label, placeholder, error
   * @returns {Component} Form.Input
   **/

  renderFields = fields => {
    return fields.map((field, index) => {
      let { name, label, placeholder, error } = field;

      // creates state key names from index
      let fieldValue = `${"value" + index}`;

      // expects a boolean
      let fieldError = `${error + index}`;

      // add conditional for input vs textfield

      if (name === "note") {
        return (
          <Form.TextArea
            key={index}
            name={name}
            label={label}
            onChange={e => {
              this.inputChange(e.target.value, fieldValue);
            }}
            placeholder={placeholder}
            error={this.state[fieldError]}
          />
        );
      }

      return (
        <Form.Input
          key={index}
          name={name}
          label={label}
          onChange={e => {
            this.inputChange(e.target.value, fieldValue);
          }}
          placeholder={placeholder}
          error={this.state[fieldError]}
        />
      );
    });
  };

  render() {
    const { hasFields } = this.state;
    let { id, fields, name, message } = this.props;

    const formId = `${id}-form`;

    console.log('message', message)

    // TODO - switch to material-ui just for form to match desired look and feel
    return (
      <Fragment>
        {hasFields ? (
          <Form id={formId}>
            {message ? <Message color={message.color} header={message.header} content={message.content}/> : null}

            {this.renderFields(fields)}
            <Form.Field onClick={() => this.submitForm(name)} control={Button}>
              Add Note
            </Form.Field>
          </Form>
        ) : (
          <p>Form has no input props!</p>
        )}
      </Fragment>
    );
  }
}

export default DynamicForm;