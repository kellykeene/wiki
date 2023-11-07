import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ArticleDatePickerProps {
  value: Date,
  onChange: (date: Date) => void,
};

function ArticleDatePicker({value, onChange}: ArticleDatePickerProps) {

  const yesterday = new Date(Date.now() - 86400000);
  
  return (
    <DatePicker
      name="selectedDate"
      selected={value}
      maxDate={yesterday}
      onChange={onChange}
      dateFormat="MMMM d, yyyy"
    />
  );
}

export default ArticleDatePicker;
