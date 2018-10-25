import * as React from 'react';
import * as Api from 'src/api';

import { DropDownInput } from 'src/components/DropDownInput/DropDownInput';
import { EmailInput } from 'src/components/EmailInput/EmailInput';
import { Form } from 'src/components/Form/Form'
import { isEmailValid } from 'src/utils';

import './AgeGenderForm.css';

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

  public handleOnEmailChange = Form.handlerWrapper(async (event: any) => {
    const email = event.target.value;
    await this.setState({ email });

    if (!email || !isEmailValid(email)) {
      await this.setState({ isDisabled: true });
    } else {
      await this.shouldEnable();
    }
  });

  public handleOnYearChange = Form.handlerWrapper(async (event: any) => {
    await this.setState({ year: event.target.value });
    await this.shouldEnable();
  });


  public handleOnGenderChange = Form.handlerWrapper(async (event: any) => {
    const gender = event.target.value;
    if (gender !== 'blank') {
      await this.setState({ gender: event.target.value });
      await this.shouldEnable();
    }
  });

  public handleSubmit = Form.handlerWrapper(
    async () => {
      const { email, gender, year } = this.state;

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

  public shouldEnable = async () => {
    const { year, gender, email } = this.state;
    const toEnable = [year, gender, email]
      .map(field => !!(field && field.trim()))
      .every(Boolean);

    await this.setState({ isDisabled: !toEnable });
  };

  public render() {
    const { email, message, isDisabled } = this.state;
    return (
      <div className="container">
        {message
          ? <h2>{message}</h2>
          : (
            <>
              <h1>Let's begin!</h1>
              <h2>Here are some simple questions to get you started.</h2>
              <Form className="ageGenderForm" name="age-gender-form" onSubmit={this.handleSubmit} disabled={isDisabled}>
                <EmailInput
                  name="email"
                  value={email}
                  label="Please enter your email:"
                  labelClassname="inputLabel"
                  onChange={this.handleOnEmailChange}
                />
                <DropDownInput
                  name="year"
                  label="The year you were born:"
                  labelClassname="inputLabel"
                  onChange={this.handleOnYearChange}
                  options={[
                    { value: undefined, text: ' ' },
                    ...rangeWithValues,
                  ]}
                />
                <DropDownInput
                  name="gender"
                  label="And lastly, please choose your gender:"
                  labelClassname="inputLabel"
                  onChange={this.handleOnGenderChange}
                  options={[
                    { value: undefined, text: ' ' },
                    { value: 'male', text: 'Male' },
                    { value: 'female', text: 'Female' }
                  ]}
                />
              </Form>
            </>
          )}
      </div>
    )
  }
};
