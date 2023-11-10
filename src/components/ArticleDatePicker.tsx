import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './ArticleDatePicker.css';

interface ArticleDatePickerProps {
  isOpen: boolean,
  value: Date,
  onChange: (date: Date) => void,
};

function ArticleDatePicker({isOpen, value, onChange}: ArticleDatePickerProps) {

  const yesterday = new Date(Date.now() - 86400000);

  return (
    <div className="datepicker" style={{display: isOpen ? 'block' : 'none'}}>
      <DatePicker
        name="selectedDate"
        selected={value}
        maxDate={yesterday}
        onChange={onChange}
        dateFormat="MMMM d, yyyy"
        open={isOpen}
      />
    </div>
  );
}

export default ArticleDatePicker;
