(function() {
    'use strict';

    class Student {
        static printStudents = function(shoudLastNameBeFirst, ...students){
            //If shouldLastNameBeFirst is an object in other word student
            //To Do later on to check if shouldLast... is acutally a student and not just object
            
            if(typeof shoudLastNameBeFirst === 'object'){
                //insert the student at index 0 by splicing the array
                students.splice(0, 0, shoudLastNameBeFirst);

                //And than set the shouldLastNameBeFirst to the default behavior of first name first
                shoudLastNameBeFirst = false;
            }

            students.forEach(student => {
                student.print(shoudLastNameBeFirst);
            });
        }

        static swapFirstAndLastName(student){
            console.log(student);
            const {first, last} = student;
            console.log('hi', first, last);
            // const newStudent =  new Student(last, first, rest.age, rest.grade);
            // console.log('newStudent', newStudent);
        }

        constructor(firstName, lastName, age, grade){
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
            this.grade = grade;
        }

        print(shouldLastNameBeFirst) {
            const fullName = shouldLastNameBeFirst ? `${this.lastName} ${this.firstName}` : `${this.firstName} ${this.lastName}`;
            console.log(`${fullName} (${this.age} years old) have an average grade of ${this.grade}.`);
        }
    }

    const students = [
        new Student('Shmuel', 'Toporowitch', 21, 97),
        new Student('Joe', 'Biden', 87, 10),
        new Student('Kamala', 'Harris', 50, 32)
    ];
        
    Student.printStudents(...students); 
    console.log('-------------');
    Student.printStudents(false, ...students); 
    console.log('-------------');
    Student.printStudents(true, ...students); 

    Student.swapFirstAndLastName(students[0]);


})();