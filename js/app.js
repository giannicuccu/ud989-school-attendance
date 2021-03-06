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
 
    const data = {}

    Object.defineProperty(data, 'attendance', {
        // value: JSON.parse(localStorage.attendance),
        // writable: false,
        get: function() {
            return attendance
        },

        set: function(source) {
             attendance = JSON.parse(source);
        },

        
        
    })




    const octopus = {

        initModel:  () => {
            data.attendance = localStorage.attendance
        },

        updateLocalStorage: () =>{
            localStorage.attendance = JSON.stringify(data.attendance);
        },

        buildStudentTable: (students ) => {             
            for(key in students){
                view.printStudentRow( key, students[key] )
            }
        },

        updateUser: ( name, row ) => {
            
            let inputs = row.querySelectorAll('input');
            //console.dir([...inputs]);
            let newAttendance = [...inputs].reduce((acc,v)=>{
                if(v.checked){
                    acc.push(true)
                }else acc.push(false)
                return acc
            },[]);
           
            data.attendance[name] = newAttendance;
            
            octopus.updateLocalStorage()
            view.cleanTable();
            octopus.buildStudentTable(data.attendance);
            
        }
    }

    const view = {
        
        printStudentRow: ( name, attend ) => {
            
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
                        
                        octopus.updateUser(name,e.target.parentElement.parentElement);
                    });
                if(element){input.setAttribute("checked","checked"); }
                td.appendChild(input);
                trow.appendChild(td)
            });
            let missedtd = document.createElement('TD');
            missedtd.setAttribute("class","missed-col");            
            missedtd.textContent = attend.filter(v=>{return v}).length;
            trow.appendChild(missedtd)
        },

        cleanTable: () => {
            
            let tbody = document.getElementsByTagName('TBODY')[0];
            tbody.innerHTML = '';
        }

    }

    octopus.initModel();
    octopus.buildStudentTable(data.attendance);

})();