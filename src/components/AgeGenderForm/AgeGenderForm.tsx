import * as React from 'react';
import * as Api from 'src/api';

import { DropDownInput } from 'src/components/DropDownInput/DropDownInput';
import { EmailInput } from 'src/components/EmailInput/EmailInput';
import { Form } from 'src/components/Form/Form'
import { isEmailValid } from 'src/utils';

const yearRange = Array.from(new Array(111), (x, i) => 2010 - i);
const rangeWithValues = yearRange.map(year => ({ text: String(year), value: String(year) }));

interface IOwnProps {
  someProp?: any;
}
type Props = IOwnProps;

type Gender = 'Male' | 'Female';

interface IOwnState {
  email?: string;
  year?: string;
  gender?: Gender;
  message?: string;
  isDisabled: boolean
}

export class AgeGenderForm extends React.PureComponent<Props, IOwnState> {
  public name: string = 'age-gender-form';
  public state: IOwnState = {
    isDisabled: true,
  };
  
  public handleOnEmailChange = Form.handlerWrapper((event: any) => {
    this.setState({ email: event.target.value });
  });
  
  public handleOnYearChange = Form.handlerWrapper((event: any) => {
    this.setState({ year: event.target.value });
  });
  
  
  public handleOnGenderChange = Form.handlerWrapper((event: any) => {
    const gender = event.target.value;
    if (gender !== 'blank') {
      this.setState({
        gender: event.target.value,
        isDisabled: false
      });
    } else {
      this.setState({ isDisabled: true });
    }
  });
  
  public handleSubmit = Form.handlerWrapper(
    async () => {
      const { email, gender, year } = this.state;

      // Since this is supposed to be a test, I'm
      // not going to spend time doing further validation.
      if(!email || !isEmailValid(email)) {
        alert('Fix the email!');
        return;
      }

      // In a normal scenario, I'd use a Form library
      // for React that would do most of the validation.
      
      const res = await Api.SubmitForm({
        name: this.name,
        payload: {
          email,
          gender,
          year,
        }
      });
      
      // Check that the POST was succesful
      if (res) {
        const { id } = res;
        this.setState({
          message: `
          Perfect! Your information was successfully submitted.
          
          Your new ID is ${id}.
          `,
        })
      }
    },
    );
    
    public render() {
    const { email, message, isDisabled } = this.state;
    return message
      ? <div>{message}</div>
      : (
        <Form name="age-gender-form" onSubmit={this.handleSubmit} disabled={isDisabled}>
          <EmailInput
            name="email"
            value={email}
            label="Please enter your email:"
            onChange={this.handleOnEmailChange}
          />
          <br />
          <DropDownInput
            name="year"
            label="And the year you were born:"
            onChange={this.handleOnYearChange}
            options={rangeWithValues}
          />
          <br />
          <DropDownInput
            name="gender"
            label="And lastly for this part, please choose your gender:"
            onChange={this.handleOnGenderChange}
            options={[
              { value: 'blank', text: ' ' },
              { value: 'male', text: 'Male' },
              { value: 'female', text: 'Female' }
            ]}
          />
        </Form>
      )
  }
};
