/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        //<var nameColumns = $('tbody .name-col'),
        var nameColumns = ['pippo the best', 'carl the worst', 'pippo su peusu','gigio il topo'],
            attendance = {};

        nameColumns.forEach(function(v) {
            console.log(v);
            var name = v;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());

const studentApp = (function () {
 
    const data = {

    attendance:{},

    loadLocalStorage: () => {             
        data.attendance = JSON.parse(localStorage.attendance) // you must set data.attendace to save the variable!!!
        },
    getAttendance: () => {             
        return data.attendance // you must set data.attendace to save the variable!!!
        }
    }

    const octopus = {
        initModel:  () => {data.loadLocalStorage()},
        buildStudentTable: (students) => {
            for(key in students){
                view.printStudentRow( key, students[key] )
            }
        },
        updateUser: (name,row) => {
            //console.log(name);
            //console.log(row);
            let inputs = row.querySelectorAll('input');
            console.dir([...inputs]);
            let attendance = [...inputs].reduce((acc,v)=>{
                if(v.checked){
                    acc.push(true)
                }else acc.push(false)
                return acc
            },[]);
            console.log (attendance)
            //get the user row
            //build the attendance array
            //update the model
            //redraw the user row
        }
    }

    const view = {
        
        printStudentRow: (name, attend ) => {
            
            let tbody = document.getElementsByTagName('TBODY')[0];
            let trow = document.createElement('TR')
            tbody.appendChild(trow);
            let tdName = document.createElement('TD');
                tdName.setAttribute("class","name-col");
                tdName.textContent = name;
            trow.appendChild(tdName);
            attend.forEach(element => {
                let td = document.createElement('TD');
                td.setAttribute("class","attedd-col");
                let input = document.createElement('INPUT');
                    input.setAttribute("type","checkbox");
                    input.addEventListener('click', (e) => {
                        //console.dir(e.target.parentElement.parentElement);
                        octopus.updateUser(name,e.target.parentElement.parentElement)
                    });
                if(element){input.setAttribute("checked","checked"); }
                td.appendChild(input);
                trow.appendChild(td)
            });
            let missedtd = document.createElement('TD');
            missedtd.setAttribute("class","missed-col");            
            missedtd.textContent = attend.filter(v=>{return v}).length;
            trow.appendChild(missedtd)
        }

    }

    octopus.initModel();
    octopus.buildStudentTable(data.getAttendance())
    //console.log(data.attendance)
   

    

/* STUDENT APPLICATION */
// $(function() {
    
//     var attendance = JSON.parse(localStorage.attendance),
//         $allMissed = $('tbody .missed-col'),
//         $allCheckboxes = $('tbody input');

//     // Count a student's missed days
//     function countMissing() {
//         $allMissed.each(function() {
//             var studentRow = $(this).parent('tr'),
//                 dayChecks = $(studentRow).children('td').children('input'),
//                 numMissed = 0;

//             dayChecks.each(function() {
//                 if (!$(this).prop('checked')) {
//                     numMissed++;
//                 }
//             });

//             $(this).text(numMissed);
//         });
//     }

//     // Check boxes, based on attendace records
//     $.each(attendance, function(name, days) {
//         var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
//             dayChecks = $(studentRow).children('.attend-col').children('input');

//         dayChecks.each(function(i) {
//             $(this).prop('checked', days[i]);
//         });
//     });

//     // When a checkbox is clicked, update localStorage
//     $allCheckboxes.on('click', function() {
//         var studentRows = $('tbody .student'),
//             newAttendance = {};

//         studentRows.each(function() {
//             var name = $(this).children('.name-col').text(),
//                 $allCheckboxes = $(this).children('td').children('input');

//             newAttendance[name] = [];

//             $allCheckboxes.each(function() {
//                 newAttendance[name].push($(this).prop('checked'));
//             });
//         });

//         countMissing();
//         localStorage.attendance = JSON.stringify(newAttendance);
//     });

//     countMissing();
// }());
})();