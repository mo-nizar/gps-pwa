import React, { FC, useState } from 'react';
import { Input, Textarea, Button } from "@nextui-org/react";
import '@styles/components/SubscribeForm.scss';
import { SecondaryButton } from './CustomButtons';
import api from "@/api";

interface Inputs {
  [key: string]: null | string;
}

interface Errors {
  email?: boolean;
  name?: boolean;
  message?: boolean;
}

interface SubscribeFormProps {
  isDemo?: boolean;
}

export const SubscribeForm: FC<SubscribeFormProps> = ({ isDemo = false }) => {
  const [inputs, setInputs] = useState<Inputs>({ email: null, name: null, message: null });
  const [errors, setErrors] = useState<Errors>({ email: false, name: false, message: false });


  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateInputs = ()=>{
    let obj: Errors = {message: !inputs.message, email: !inputs.email};

    console.log(obj);
    

    setErrors( {...errors, ...obj } );

    return (!!inputs.email && !!inputs.message);

  }

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async () => {
    setLoading(true);

    const params: Inputs = {
      ...inputs,
      phone: null
    }

    if(!validateEmail(inputs.email as string)){
      params.phone = inputs.email,
      params.email = null
    };

      try {
        if (validateInputs()){

            const res = await api.post("/sales/queries", null, {
              params:{
                ...params,
                isDemo
              }
            });
            const { data } = res;
            setIsSuccess(data?.data?.success);
            setInputs({email: null, name: null, message: null})

        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
  };

  const onValueChange = (value: string, key: string)=>{
    setInputs({ ...inputs, [key]: value })
    errors[key] && setErrors({...errors, [key]: false});
  };

  console.log(errors);
  

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
          classNames={{ label: 'label', input: ['input', "placeholder:text-default-700/30"], inputWrapper: ['inputWrapper', errors.email && 'errored'] }}
          type="text"
          label="Email or Phone"
          placeholder="you@example.com or +44 000 000 0000"
          value={inputs.email || ''}
          labelPlacement="outside"
          onValueChange={(value) => onValueChange(value, 'email')}
        />
        <Input
          classNames={{ label: 'label', input: ['input', "placeholder:text-default-700/30"], inputWrapper: ['inputWrapper' , errors.name && 'errored'] }}
          type="text"
          label="Name"
          placeholder="E.g. Ben"
          labelPlacement="outside"
          value={inputs.name || ''}
          onValueChange={(value) => onValueChange(value, 'name')}
        />
        <Textarea
          classNames={{ label: 'textLabel', innerWrapper: 'inner-wrapper', input: ['input', "placeholder:text-default-700/30"], inputWrapper: ['textBoxWrapper', errors.message && 'errored'] }}
          type="text"
          label="Message"
          labelPlacement="outside"
          placeholder="Type your message here"
          value={inputs.message || ''}
          onValueChange={(value) => onValueChange(value, 'message')}
        />

        <SecondaryButton className='button' onClick={handleSubmit} disabled={loading}>
          {'Submit'}
        </SecondaryButton>
    </div>
  );
};
