const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const bodyparser = require("body-parser")

var app = express();
app.use(bodyparser.json());



router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Signup Form"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

router.get('/login', (req, res) => {
    res.render("employee/login", {
      viewTitle: "Login Form"
    });
    });

    router.get("/loggedin",(req, res)=>{
        res.render("employee/loggedin",{
        viewTitle: "You are Logged in to Website sir"
      })
    })


     
    router.post("/loggedin",(req, res)=>{
    console.log("hello world");
    var mobile = req.body.mobile;
    var name = req.body.fullName;
    console.log(name);
    console.log(mobile);
    Employee.findOne({mobile : mobile , fullName : name})
    .then(user =>{
        if(user)
        {
              res.render("employee/loggedin",{
                   viewTitle: "You are logged in to website sir"
                })
        }else
        {
            
                res.render("employee/login",{
                  viewTitle:"Invalid Credentials! Please Try Again"
                })
        }

    }).catch(err =>{
        console.log(err);
    });
    // console.log(val);
    // if(val) {
    //   }
    //   else {
    //   }
    })


     function insertRecord(req, res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Signup Form",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Signup Form',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
                list: docs

            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
                case 'mobile':
                    body['mobileError'] = err.errors[field].message;
                    break;
                    case 'city':
                body['cityError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;
