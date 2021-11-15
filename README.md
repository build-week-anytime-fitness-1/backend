# backend

Registration:
https://build-week-anytime-fitness-1.herokuapp.com/api/auth/register

Instructor registration:{
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    role_id: 1    
}

Client registration: {
    first_name: '',
    last_name: '',
    username: '',
    password: ''    
}

Login: (not yet functional)
https://build-week-anytime-fitness-1.herokuapp.com/api/auth/login

login: {
    username: '',
    password: ''
}

Create/edit class: (not yet functional)
https://build-week-anytime-fitness-1.herokuapp.com/api/classes

Create class: {
    class_name: '',
    type: '',
    instructor_id: integer,
    time: '',        // (12:00:00 format ('time' type on form) for submission)
    date: '',        // (2021-10-08 format ('date' type on form) for submission)
    duration: integer,
    intensity: integer,
    location: '',
    max_class_size: integer,
    }


 