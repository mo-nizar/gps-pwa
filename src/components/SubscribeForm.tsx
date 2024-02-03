import React, { FC, useState } from 'react';
import { Input, Textarea, Button } from "@nextui-org/react";
import '@styles/components/SubscribeForm.scss';
import { PrimaryButton, SecondaryButton } from './CustomButtons';

interface Inputs {
  email: null | string;
  name: null | string;
  message: null | string;
}

export const SubscribeForm: FC = () => {
  const [inputs, setInputs] = useState<Inputs>({ email: null, name: null, message: null });

  return (
    <div className='form flex w-full flex-col  flex-wrap md:flex-nowrap gap-4'>
          <div className="titleWrapper">
            <span className='title'>
              {'Get In Touch!'}
            </span>
            <span className='desc'>
              {'Fill up the form and our Team will get back to you within 24 hours.'}
            </span>
          </div>

        <Input
          classNames={{ label: 'label', input: 'input', inputWrapper: 'inputWrapper' }}
          type="email"
          label="Email"
          value={inputs.email || ''}
          onValueChange={(value) => setInputs({ ...inputs, email: value })}
        />
        <Input
          classNames={{ label: 'label', input: 'input', inputWrapper: 'inputWrapper' }}
          type="text"
          label="Name"
          value={inputs.name || ''}
          onValueChange={(value) => setInputs({ ...inputs, name: value })}
        />
        <Textarea
          classNames={{ label: 'textLabel', innerWrapper: 'inner-wrapper', input: 'input', inputWrapper: 'textBoxWrapper' }}
          type="text"
          label="Message"
          value={inputs.message || ''}
          onValueChange={(value) => setInputs({ ...inputs, message: value })}
        />

        <SecondaryButton className='button' onClick={()=>{}}>
          Submit
        </SecondaryButton>
    </div>
  );
};
