import React, { Component } from 'react'
import {
  Button,
  Form,
  Input,
  Select,
  TextArea,
} from 'semantic-ui-react'


//Validation for email and Contact Number
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePhoneNumber(inputtxt) {
  const phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  return (inputtxt.match(phoneno));
}


//Dropdown Options
const options1 = [
  { key: 'st', text: 'Startup', value: 'startup' },
  { key: 'in', text: 'Individual', value: 'individual' },
  { key: 'le', text: 'Large Enterprise', value: 'lEnterprise' },

]

const options2 = [
  { key: 'yes', text: 'Yes', value: 'yes' },
  { key: 'no', text: 'No', value: 'no' }
]

const options3 = [
  { key: '<1', text: '<1K USD', value: '<1' },
  { key: '1-5', text: 'IK USD - 5K USD', value: '1-5' },
  { key: '5-10', text: '5K USD - 10K USD', value: '5-10' },
  { key: '10-20', text: 'I0K USD - 20K USD', value: '10-20' },
  { key: '20+', text: '20K + USD', value: '20+' },
]


//App Component
class App extends Component {
  state = {
    name: {
      value: "",
      error: false
    },
    contact: {
      value: "",
      error: false
    },
    email: {
      value: "",
      error: false
    },
    techStack: {
      value: "",
      error: false
    },
    selected: ["Startup", "Yes", "<1K USD"]
  }

  handleChange = (e, { value }) => {
    this.setState({ [e.target.id]: { value, error: false } })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var error = false;
    if (this.state.name.value === "") {
      this.setState({
        name: {
          ...this.state.name,
          error: true
        }
      })
      error = true;
    }
    if (this.state.contact.value === "" || !validatePhoneNumber(this.state.contact.value)) {
      this.setState({
        contact: {
          ...this.state.contact,
          error: true
        }
      })
      error = true;
    }
    if (this.state.email.value === "" || !validateEmail(this.state.email.value)) {
      this.setState({
        email: {
          ...this.state.email,
          error: true
        }
      })
      error = true;
    }
    if (this.state.techStack.value === "") {
      this.setState({
        techStack: {
          ...this.state.techStack,
          error: true
        }
      })
      error = true;
    }
    if (!error) {
      const newData = {
        name: this.state.name.value,
        contact: this.state.contact.value,
        email: this.state.email.value,
        techStack: this.state.techStack.value
      };
      try {
        var data = [...JSON.parse(localStorage.getItem("formData"))];
      }
      catch (err) {
        var data = [];
      }
      data.push(newData);
      localStorage.setItem("formData", JSON.stringify(data));

    }
  }
  render() {

    return (
      <div style={{
        margin: "100px 160px"
      }}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field onChange={this.handleChange}
            control={Input}
            label='Your name'
            id="name"
            error={this.state.name.error ? { content: "This field is required", pointing: "below" } : null}
          />
          <Form.Field onChange={this.handleChange}
            control={Input}
            label='Contact Number'
            id="contact"
            error={this.state.contact.error ? { content: "Enter a Valid Contact Number", pointing: "below" } : null}
          />
          <Form.Field onChange={this.handleChange}
            control={Input}
            label='Your Email'
            id="email"
            error={this.state.email.error ? { content: "Enter a valid email", pointing: "below" } : null}
          />
          <Form.Field
            control={Select}
            label='How would you categorise yourself?'
            options={options1}
            placeholder='Startup'
            id="categoriseYourself"
            defaultValue={this.state.selected}
          />
          <Form.Field onChange={this.handleChange}
            control={Input}
            label='Do you have a preferred tech stack? If yes, which one?'
            id="techStack"
            error={this.state.techStack.error ? { content: "This field is required", pointing: "below" } : null}
          />
          <Form.Field
            control={Select}
            label='Do you have product specs or wireframes documented?'
            options={options2}
            placeholder='Yes'
            id="productSpecs"
            defaultValue={this.state.selected}
          />
          <Form.Field
            control={Select}
            label='What is your estimated budget?'
            options={options3}
            placeholder='< 1K USD'
            id="estimateBudget"
            defaultValue={this.state.selected}
          />
          <Form.Field onChange={this.handleChange}
            control={TextArea}
            label='Describe the project in few lines'
            id="description"
          />
          <Form.Field control={Button} color={"teal"} fluid>Request Quote</Form.Field>
        </Form>
      </div >
    )
  }
}

export default App