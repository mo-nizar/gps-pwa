import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import "@styles/components/DateTimeInput.scss";

interface BasicDateTimePickerProps {
  value: Date | null;
  onChange: (newValue: Date | null) => void;
  label?: string;
  isRequired?: boolean;
  className?: string;
}

interface DateTimeState {
  time: dayjs.Dayjs | null;
  date: dayjs.Dayjs | null;
}

const MobileDateTimePicker: React.FC<BasicDateTimePickerProps> = ({ value, onChange, label, className }) => {
  const [dateTime, setDateTime] = useState<DateTimeState>({ time: null, date: null });

  const onDateTimeChange = (value: dayjs.Dayjs | null, isDate: boolean) => {
    if (isDate) {
      setDateTime({ ...dateTime, date: value });
      if (dateTime.time && value) {
        const dateObject = new Date(value.toDate());
        const timeObject = new Date(dateTime.time.toDate());
        dateObject.setHours(timeObject.getHours());
        dateObject.setMinutes(timeObject.getMinutes());
        dateObject.setSeconds(timeObject.getSeconds());
        onChange(dateObject);
      }
    } else {
      setDateTime({ ...dateTime, time: value });
      
      if (dateTime.date && value) {
        const dateObject = new Date(dateTime.date.toDate());
        const timeObject = new Date(value.toDate());
        dateObject.setHours(timeObject.getHours());
        dateObject.setMinutes(timeObject.getMinutes());
        dateObject.setSeconds(timeObject.getSeconds());
        onChange(dateObject);
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <div className='flex flex-row'>
          <MobileDatePicker
            className={`${className} container`}
            label={label || ''}
            value={dateTime.date}
            onChange={(val) => onDateTimeChange(val, true)}
            disablePast={true}
            closeOnSelect={true}
          />
          <DesktopTimePicker
            className={`${className} container`}
            label={label || ''}
            value={dateTime.time}
            onChange={(val) => onDateTimeChange(val, false)}
            ampm={false}
            timeSteps={{ hours: 1, minutes: 30, seconds: 0 }}
            closeOnSelect={true}
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default MobileDateTimePicker;
