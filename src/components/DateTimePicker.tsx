import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import "@styles/components/DateTimeInput.scss";

interface BasicDateTimePickerProps {
  value: Date | null;
  onChange: (newValue: Date | null) => void;
  label?: string;
}

const DateTimeInput: React.FC<BasicDateTimePickerProps> = ({ value, label, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker
        className='container'
          label={label || ''}
          value={value ?? null}
          onChange={onChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DateTimeInput;
