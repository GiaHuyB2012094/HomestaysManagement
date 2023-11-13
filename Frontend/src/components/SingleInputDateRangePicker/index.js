import { useState } from 'react';
import classNames from "classnames/bind";
import styles from './SingleInputDateRangePicker.module.scss'
import Calendar from '@mui/icons-material/Event';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

const cx = classNames.bind(styles);

function SingleInputDateRangePicker() {
    let tt = dayjs();
    const [date, setDate] = useState([tt, tt]);
    return {
        date,
        renderSingleInputDateRangePicker : (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['SingleInputDateRangeField']}>
                    <DateRangePicker
                        className={cx('DateRangePicker')}
                        value={date}
                        onChange={(newdate) => setDate(newdate)}
                        slots={{ field: SingleInputDateRangeField }}
                        slotProps={{ textField: { InputProps: { endAdornment: <Calendar /> } } }}
                    />
                </DemoContainer>
            </LocalizationProvider>
        ),
    };
}
export default SingleInputDateRangePicker;