const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,


    },
    email: {
        type: String
    },
    mobile: {
        type: String

    },
    city: {
        type: String,
        
    }
});

employeeSchema.path('city').validate((val) => {
    emailRegex = ""
    return !(emailRegex.match(val));
}, 'Please enter a city');

employeeSchema.path('city').validate((val) => {
    emailRegex = /^[a-zA-Z]*$/;
    return (emailRegex.test(val));
}, 'city should only contain letters');


employeeSchema.path('fullName').validate((val) => {
    emailRegex = ""
    return !(emailRegex.match(val));
}, 'Please enter your name');

employeeSchema.path('fullName').validate((val) => {
    emailRegex = /^[0-9]*$/;
    return !(emailRegex.test(val));
}, 'Name should not contain numbers');



mongoose.model('Employee', employeeSchema);
// Custom validation for email
employeeSchema.path('email').validate((val) => {
    emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

employeeSchema.path('mobile').validate((val) => {
    emailRegex = "";
    return !(emailRegex.match(val));
}, 'Please enter phone number');


employeeSchema.path('mobile').validate((val) => {
    emailRegex = /^[0-9]{10}$/;
    return emailRegex.test(val);
}, 'Invalid phone number');
