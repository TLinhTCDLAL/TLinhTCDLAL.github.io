function searchQuery() {
    //clear page
    document.getElementById('root').innerHTML = ''; 
    
    /*get user search inputs*/
    var input_word = document.getElementById('word-select');
    var input_state = document.getElementById('state-select');
    var input_designation = document.getElementById('designation-select');

    var user_word = input_word.value;
    var user_state = input_state[input_state.selectedIndex].value;
    var user_desig = input_designation[input_designation.selectedIndex].value;
    
    //get designation specific info
    user_desig = getDesignation(user_desig);

    var num_calls = user_desig[0];
    var arr_q = user_desig[1];
    var arr_term = user_desig[2];

    const api_key = 'RoDKlbWqnzfJpNRDUKRcFI1vus8oxMwc8XsHWPyY';

    var call_word = '';
    var call_state = '';
    var call_desig = '';
    var call_term;
    var compiled_json = [];

    for (var i = 0; i < num_calls; i++) {

        call_term = arr_term[i];

        if (user_word != '') {
            call_word = '&q=' + user_word;
            user_desig = 0;
            num_calls = 1;
            call_term = '';
        }

        if (user_state != 'none') {
            call_state = '&stateCode=' + user_state;
        }

        if (user_desig != '0') {
            call_desig = '&q=' + arr_q[i];
        }
        
        
        //NOTE: keyword takes precedent over designation filtering
        var url = 'https://developer.nps.gov/api/v1/parks?' 
        + call_desig + call_state + call_word //order: designation, state, keyword, as to invoke searching precendence
        + '&sort=fullName' //alphabetic order
        + '&api_key=' + api_key;


        fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var start_index = compiled_json.length;
            compiled_json = termSearch(data, call_term, compiled_json);

            const app = document.getElementById('root');
            const contain = document.createElement('div');
            contain.setAttribute('class', 'contain');
            app.appendChild(contain);
            displayResults(compiled_json, contain, start_index);
        
        })
        .catch(function (err) {
            console.log(err);
        });
    }
}

function getDesignation(desig) {
    var num_calls;
    var arr_q;
    var arr_search;

    if (desig == '0') { //Any Designation
        num_calls = 1;
        arr_q = [''];
        arr_search = [''];
    } else if (desig == '1') { //National Battlefield
        num_calls = 1;
        arr_q = ['National Battlefield'];
        arr_search = ['Battlefield'];
    } else if (desig == '2') { //National Battlefield Park
        num_calls = 1;
        arr_q = ['National Battlefield Park'];
        arr_search = [''];
    } else if (desig == '3') { //National Battlefield Site
        num_calls = 1;
        arr_q = ['National Battlefield Site'];
        arr_search = [''];
    } else if (desig == '4') { //National Military Park
        num_calls = 1;
        arr_q = ['National Military Park'];
        arr_search = [''];
    } else if (desig == '5') { //National Historical Park
        num_calls = 1;
        arr_q = ['National Historical Park'];
        arr_search = [''];
    } else if (desig == '6') { //National Historic Site
        num_calls = 1;
        arr_q = ['National Historic Site'];
        arr_search = [''];
    } else if (desig == '7') { //International Historic Site
        num_calls = 1;
        arr_q = ['International Historic Site'];
        arr_search = [''];
    } else if (desig == '8') { //National Lakeshore
        num_calls = 1;
        arr_q = ['National Lakeshore'];
        arr_search = [''];
    } else if (desig == '9') { //National Memorial
        num_calls = 1;
        arr_q = ['Memorial'];
        arr_search = ['Memorial'];
    } else if (desig == '10') { //National Monument
        num_calls = 1;
        arr_q = ['National Monument'];
        arr_search = [''];
    } else if (desig == '11') { //National Park
        num_calls = 1;
        arr_q = ['National Park'];
        arr_search = ['National Park'];
    } else if (desig == '12') { //National Parkway
        num_calls = 1;
        arr_q = ['Parkway'];
        arr_search = ['Parkway'];
    } else if (desig == '13') { //National Preserve
        num_calls = 1;
        arr_q = ['National Preserve'];
        arr_search = ['Preserve'];;
    } else if (desig == '14') { //National Reserve
        num_calls = 1;
        arr_q = ['National Reserve'];
        arr_search = ['Reserve'];
    } else if (desig == '15') { //National Recreation Area
        num_calls = 1;
        arr_q = ['National Recreation Area'];
        arr_search = [''];
    } else if (desig == '16') { //National River
        num_calls = 2;
        arr_q = ['National River', 'National Scenic Riverways'];
        arr_search = ['', ''];
    } else if (desig == '17') { //National Wild and Scenic River and Riverways
        num_calls = 3;
        arr_q = ['Alagnak Wild River', 'Scenic River', 'Recreational River'];
        arr_search = ['', 'Scenic River', ''];
    } else if (desig == '18') { //National Scenic Trail
        num_calls = 1;
        arr_q = ['National Scenic Trail'];
        arr_search = [''];
    } else if (desig == '19') { //National Seashore
        num_calls = 1;
        arr_q = ['National Seashore'];
        arr_search = [''];
    } else { //Other Designation
        num_calls = 11;
        arr_q = ['Catoctin Mountain Park', 'Constitution Gardens', 'National Mall and Memorial Parks',
        'Fort Washington Park', 'Greenbelt Park', 'National Capital Parks', 
        'Piscataway Park', 'Prince William Forest Park', 'Rock Creek Park', 
        "President's Park (White House)", 'Wolf Trap National Park for the Performing Arts'];
        arr_search = ['', '', '', '', '', '', '', '', '', '', ''];
    }

    return [num_calls, arr_q, arr_search];
}

function termSearch(json, term, arr) {
    var result = json.data;
    
    for (var i = 0; i < result.length; i++) {
        if (result[i].fullName.endsWith(term) || term == '') {
            arr.push(result[i]);
        }
    }

    return arr;
}

function displayResults(compiled_json, contain, start_index) {
    for (var i = start_index; i < compiled_json.length; i++) {
        var current_park = compiled_json[i];

        const card = document.createElement('div')
        card.id = i;
        card.setAttribute('class', 'card')

        card.addEventListener("click", function() {
            localStorage.setItem('parkPass', JSON.stringify(compiled_json[this.id]));
            console.log(compiled_json[this.id]);
            window.location.href = 'search_result.html';
            //localStorage.setItem('defaultReportData', JSON.stringify(arr[1]));
        }, false);

        const h1 = document.createElement('h1')
        h1.textContent = current_park.fullName

        const p = document.createElement('p')
        current_park.description = current_park.description.substring(0, 300)
        p.textContent = `${current_park.description}...`

        contain.appendChild(card)
        card.appendChild(h1)
        card.appendChild(p) 
    } 
}


document.getElementById('search-btn').addEventListener('click', searchQuery);