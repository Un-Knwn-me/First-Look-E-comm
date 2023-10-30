import React, { useState } from 'react'
import Datepicker from "react-tailwindcss-datepicker";

// const options = {
//     title: "Select Date",
//     autoHide: true,
//     todayBtn: true,
// 	clearBtn: true,
//     clearBtnText: "Clear",
//     maxDate: new Date("2030-01-01"),
// 	minDate: new Date("1950-01-01"),
//     theme: {
// 		background: "",
// 		todayBtn: "",
// 		clearBtn: "",
// 		icons: "",
// 		text: "",
// 		disabledText: "",
// 		input: "",
// 		inputIcon: "",
// 		selected: "",
// 	},
//     icons: {
// 		prev: () => <span><SkipPreviousSharpIcon /></span>,
// 		next: () => <span><SkipNextSharpIcon /></span>,
// 	},
//     datepickerClassNames: "top-12",
// 	defaultDate: new Date(),
//     language: "en",
// 	disabledDates: [],
// 	weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
// 	inputNameProp: "date",
// 	inputIdProp: "date",
// 	inputPlaceholderProp: "Select Date",
// 	inputDateFormatProp: {
// 		day: "numeric",
// 		month: "long",
// 		year: "numeric"
// 	}
// }

const DateInput = () => {
    const [value, setValue] = useState({ 
        startDate: new Date(),
        }); 

        const handleValueChange = (newValue) => {
            console.log("newValue:", newValue); 
            setValue(newValue); 
            } 

    // const [show, setShow] = useState(false);
    // const [selectedDate, setSelectedDate] = useState(null);

    // const handleChange = (selectedDate) => {
    //     setSelectedDate(selectedDate);
    //     console.log(selectedDate);
    // };

	// const handleClose = (state) => {
    //     setShow(state);
    // };

  return (
    <div>
        <Datepicker
        inputClassName="w-full rounded-md bg-white px-2 py-1" 
        asSingle={true} 
        displayFormat={"DD-MM-YYYY"} 
        useRange={false}
        popoverDirection="down"
        primaryColor={"blue"}
        value={value} 
        onChange={handleValueChange} 
        showShortcuts={true}
    /> 
	</div>
  )
}

export default DateInput

