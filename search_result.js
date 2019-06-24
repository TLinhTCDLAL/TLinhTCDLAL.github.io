function start(){
    
    var parkData = JSON.parse(localStorage.getItem('parkPass'));
    const api_key = 'RoDKlbWqnzfJpNRDUKRcFI1vus8oxMwc8XsHWPyY';

    //Tab 1 - Info
    var park_url = 'https://developer.nps.gov/api/v1/parks?parkCode=' + parkData.parkCode + '&api_key=' + api_key;

    fetch(park_url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var park = data.data[0];

            document.getElementById('title').innerHTML = park.fullName;
            document.getElementById('park-state').innerHTML = park.states;
            document.getElementById('park-des').innerHTML = park.description;
            document.getElementById('park-dir').innerHTML = park.directionsUrl;
            document.getElementById('park-site').innerHTML = park.url;

            
        })
        .catch(function (err) {
            console.log(err);
        });

    //Tab 2 - Visitor Centers
    var park_url = 'https://developer.nps.gov/api/v1/visitorcenters?parkCode=' + parkData.parkCode + '&api_key=' + api_key;

    fetch(park_url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var arr_vc = data.data;
            
            var app = document.getElementById('tab2');
            var contain = document.createElement('div');
            contain.setAttribute('class', 'contain');
            app.appendChild(contain);

            //if json is empty 
            if (arr_vc.length == 0) {
                var title_none = document.createElement('h2');
                title_none.setAttribute('class', 'info-content');
                title_none.textContent = 'No Results'
                contain.appendChild(title_none);
            }

            for (var i = 0; i < arr_vc.length; i++) {
                var card = document.createElement('div')
                card.setAttribute('class', 'card')

                var vc_name = document.createElement('h3')
                vc_name.setAttribute('class', 'info-content')
                vc_name.textContent = arr_vc[i].name;

                //description
                var vc_title_des = document.createElement('p')
                vc_title_des.setAttribute('class', 'info-content info-header')
                vc_title_des.textContent = 'Description: '

                var vc_des = document.createElement('p')
                vc_des.setAttribute('class', 'info-content')
                vc_des.textContent = arr_vc[i].description;

                //directions
                var vc_title_dir = document.createElement('p')
                vc_title_dir.setAttribute('class', 'info-content info-header')
                vc_title_dir.textContent = 'Directions: '

                var vc_dir = document.createElement('p')
                vc_dir.setAttribute('class', 'info-content')
                vc_dir.textContent = arr_vc[i].directionsUrl;

                //site
                var vc_title_site = document.createElement('p')
                vc_title_site.setAttribute('class', 'info-content info-header')
                vc_title_site.textContent = 'Associated Site: '

                var vc_site = document.createElement('p')
                vc_site.setAttribute('class', 'info-content')
                vc_site.textContent = arr_vc[i].url;

                contain.appendChild(card)
                card.appendChild(vc_name) 
                var break_line1 = document.createElement('br');
                card.appendChild(break_line1)
                card.appendChild(vc_title_des)
                card.appendChild(vc_des)
                var break_line2 = document.createElement('br');
                card.appendChild(break_line2)
                card.appendChild(vc_title_dir)
                card.appendChild(vc_dir)
                var break_line3 = document.createElement('br');
                card.appendChild(break_line3)
                card.appendChild(vc_title_site)
                card.appendChild(vc_site)
            }

        })
        .catch(function (err) {
            console.log(err);
        });



        //Tab 3 - Campgrounds
        var park_url = 'https://developer.nps.gov/api/v1/campgrounds?parkCode=' + parkData.parkCode + '&api_key=' + api_key;

        fetch(park_url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var arr_cg = data.data;

            var app = document.getElementById('tab3');
            var contain = document.createElement('div');
            contain.setAttribute('class', 'contain');
            app.appendChild(contain);

            //if json is empty 
            if (arr_cg.length == 0) {
                var title_none = document.createElement('h2');
                title_none.setAttribute('class', 'info-content');
                title_none.textContent = 'No Results'
                contain.appendChild(title_none);
            }


            for (var i = 0; i < arr_cg.length; i++) {
                var card = document.createElement('div')
                card.setAttribute('class', 'card')

                var cg_name = document.createElement('h3')
                cg_name.setAttribute('class', 'info-content')
                cg_name.textContent = arr_cg[i].name;

                //description
                var cg_title_des = document.createElement('p')
                cg_title_des.setAttribute('class', 'info-content info-header')
                cg_title_des.textContent = 'Description: '

                var cg_des = document.createElement('p')
                cg_des.setAttribute('class', 'info-content')
                cg_des.textContent = arr_cg[i].description;

                //directions
                var cg_title_dir = document.createElement('p')
                cg_title_dir.setAttribute('class', 'info-content info-header')
                cg_title_dir.textContent = 'Directions: '

                var cg_dir = document.createElement('p')
                cg_dir.setAttribute('class', 'info-content')
                cg_dir.textContent = arr_cg[i].directionsUrl;

                //regulations
                var cg_title_reg = document.createElement('p')
                cg_title_reg.setAttribute('class', 'info-content info-header')
                cg_title_reg.textContent = 'Regulations: '

                var cg_reg = document.createElement('p')
                cg_reg.setAttribute('class', 'info-content')
                cg_reg.textContent = arr_cg[i].regulationsoverview;

                contain.appendChild(card)
                card.appendChild(cg_name) 
                var break_line1 = document.createElement('br');
                card.appendChild(break_line1)
                card.appendChild(cg_title_des)
                card.appendChild(cg_des)
                var break_line2 = document.createElement('br');
                card.appendChild(break_line2)
                card.appendChild(cg_title_dir)
                card.appendChild(cg_dir)
                var break_line3 = document.createElement('br');
                card.appendChild(break_line3)
                card.appendChild(cg_title_reg)
                card.appendChild(cg_reg)
            }

        })
        .catch(function (err) {
            console.log(err);
        });


        
        //Tab 4 - Alerts
        var park_url = 'https://developer.nps.gov/api/v1/alerts?parkCode=' + parkData.parkCode + '&api_key=' + api_key;

        fetch(park_url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var arr_al = data.data;
            
            var app = document.getElementById('tab4');
            var contain = document.createElement('div');
            contain.setAttribute('class', 'contain');
            app.appendChild(contain);

            //if json is empty 
            if (arr_al.length == 0) {
                var title_none = document.createElement('h2');
                title_none.setAttribute('class', 'info-content');
                title_none.textContent = 'No Results'
                contain.appendChild(title_none);
            }

            for (var i = 0; i < arr_al.length; i++) {
                var card = document.createElement('div')
                card.setAttribute('class', 'card')

                var al_name = document.createElement('h3')
                al_name.setAttribute('class', 'info-content')
                al_name.textContent = arr_al[i].title;

                //description
                var al_title_des = document.createElement('p')
                al_title_des.setAttribute('class', 'info-content info-header')
                al_title_des.textContent = 'Description: '

                var al_des = document.createElement('p')
                al_des.setAttribute('class', 'info-content')
                al_des.textContent = arr_al[i].description;

                contain.appendChild(card)
                card.appendChild(al_name) 
                var break_line1 = document.createElement('br');
                card.appendChild(break_line1)
                card.appendChild(al_title_des)
                card.appendChild(al_des)
    
            }

        })
        .catch(function (err) {
            console.log(err);
        });


        //Tab 5 - Articles
        var park_url = 'https://developer.nps.gov/api/v1/articles?parkCode=' + parkData.parkCode + '&api_key=' + api_key;

        fetch(park_url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var arr_ar = data.data;
            
            var app = document.getElementById('tab5');
            var contain = document.createElement('div');
            contain.setAttribute('class', 'contain');
            app.appendChild(contain);

            //if json is empty 
            if (arr_ar.length == 0) {
                var title_none = document.createElement('h2');
                title_none.setAttribute('class', 'info-content');
                title_none.textContent = 'No Results'
                contain.appendChild(title_none);
            }

            for (var i = 0; i < arr_ar.length; i++) {
                var card = document.createElement('div')
                card.setAttribute('class', 'card')

                var ar_name = document.createElement('h3')
                ar_name.setAttribute('class', 'info-content')
                ar_name.textContent = arr_ar[i].title;

                //site
                var ar_title_site = document.createElement('p')
                ar_title_site.setAttribute('class', 'info-content info-header')
                ar_title_site.textContent = 'Associated Site: '

                var ar_site = document.createElement('p')
                ar_site.setAttribute('class', 'info-content')
                ar_site.textContent = arr_ar[i].url

                //description
                var ar_title_des = document.createElement('p')
                ar_title_des.setAttribute('class', 'info-content info-header')
                ar_title_des.textContent = 'Description: '

                var ar_des = document.createElement('p')
                ar_des.setAttribute('class', 'info-content')
                ar_des.textContent = arr_ar[i].listingdescription

                //image
                var img_contain = document.createElement('div')
                img_contain.setAttribute('class', 'contain-img landscape')
                card.appendChild(img_contain)
                var ar_img = document.createElement('img')
                ar_img.setAttribute('class', 'info-img')
                ar_img.src = arr_ar[i].listingimage.url
                

                contain.appendChild(card)
                card.appendChild(ar_name) 
                var break_line1 = document.createElement('br');
                card.appendChild(break_line1)
                card.appendChild(ar_title_site)
                card.appendChild(ar_site)
                var break_line2 = document.createElement('br');
                card.appendChild(break_line2)
                card.appendChild(ar_title_des)
                card.appendChild(ar_des)    
                img_contain.appendChild(ar_img)
                
                
            }

        })
        .catch(function (err) {
            console.log(err);
        });


        //Tab 6 - Events
        var park_url = 'https://developer.nps.gov/api/v1/events?parkCode=' + parkData.parkCode + '&api_key=' + api_key;

        fetch(park_url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var arr_ev = data.data;
            
            var app = document.getElementById('tab6');
            var contain = document.createElement('div');
            contain.setAttribute('class', 'contain');
            app.appendChild(contain);

            //if json is empty 
            if (arr_ev.length == 0) {
                var title_none = document.createElement('h2');
                title_none.setAttribute('class', 'info-content');
                title_none.textContent = 'No Results'
                contain.appendChild(title_none);
            }

            for (var i = 0; i < arr_ev.length; i++) {
                var card = document.createElement('div')
                card.setAttribute('class', 'card')

                var ev_name = document.createElement('h3')
                ev_name.setAttribute('class', 'info-content')
                ev_name.textContent = arr_ev[i].title;

                //description
                var ev_title_des = document.createElement('p')
                ev_title_des.setAttribute('class', 'info-content info-header')
                ev_title_des.textContent = 'Description: '

                var ev_des = document.createElement('p')
                ev_des.setAttribute('class', 'info-content')
                var html = arr_ev[i].description;
                var temp_div = document.createElement("div");
                temp_div.innerHTML = html;
                var text = temp_div.textContent || temp_div.innerText || "";
                ev_des.textContent = text;

                //location
                var ev_title_loc = document.createElement('p')
                ev_title_loc.setAttribute('class', 'info-content info-header')
                ev_title_loc.textContent = 'Location: '

                var ev_loc = document.createElement('p')
                ev_loc.setAttribute('class', 'info-content')
                ev_loc.textContent = arr_ev[i].location;

                
                //end date
                var ev_title_end = document.createElement('p')
                ev_title_end.setAttribute('class', 'info-content info-header')
                ev_title_end.textContent = 'Open Until: '

                var ev_end = document.createElement('p')
                ev_end.setAttribute('class', 'info-content')
                ev_end.textContent = arr_ev[i].dates[arr_ev[i].dates.length - 1];

                //time open
                var ev_title_time = document.createElement('p')
                ev_title_time.setAttribute('class', 'info-content info-header')
                ev_title_time.textContent = 'Time: '

                var ev_time = document.createElement('p')
                ev_time.setAttribute('class', 'info-content')
                ev_time.textContent = arr_ev[i].times[0].timestart + ' - ' + arr_ev[i].times[0].timeend

                //free
                var ev_title_free = document.createElement('p')
                ev_title_free.setAttribute('class', 'info-content info-header')
                ev_title_free.textContent = 'Free: '

                var ev_free = document.createElement('p')
                ev_free.setAttribute('class', 'info-content')
                if (arr_ev[i].isfree) {
                    ev_free.textContent = 'Yes'
                } else {
                    ev_free.textContent = 'No'
                }
                
                //contact
                var ev_title_con = document.createElement('p')
                ev_title_con.setAttribute('class', 'info-content info-header')
                ev_title_con.textContent = 'Contact: '

                var ev_con = document.createElement('p')
                ev_con.setAttribute('class', 'info-content')
                ev_con.textContent = arr_ev[i].contactname

                //contact number
                var ev_title_num = document.createElement('p')
                ev_title_num.setAttribute('class', 'info-content info-header')
                ev_title_num.textContent = 'Contact Number: '

                var ev_num = document.createElement('p')
                ev_num.setAttribute('class', 'info-content')
                ev_num.textContent = arr_ev[i].contacttelephonenumber
                

                contain.appendChild(card)
                card.appendChild(ev_name) 
                var break_line1 = document.createElement('br');
                card.appendChild(break_line1)
                card.appendChild(ev_title_des)
                card.appendChild(ev_des)
                var break_line2 = document.createElement('br');
                card.appendChild(break_line2)
                card.appendChild(ev_title_loc)
                card.appendChild(ev_loc)
                var break_line3 = document.createElement('br');
                card.appendChild(break_line3)
                card.appendChild(ev_title_end)
                card.appendChild(ev_end)
                var break_line4 = document.createElement('br');
                card.appendChild(break_line4)
                card.appendChild(ev_title_time)
                card.appendChild(ev_time)
                var break_line5 = document.createElement('br');
                card.appendChild(break_line5)
                card.appendChild(ev_title_free)
                card.appendChild(ev_free)
                var break_line6 = document.createElement('br');
                card.appendChild(break_line6)
                card.appendChild(ev_title_con)
                card.appendChild(ev_con)
                var break_line7 = document.createElement('br');
                card.appendChild(break_line7)
                card.appendChild(ev_title_num)
                card.appendChild(ev_num)
            }

        })
        .catch(function (err) {
            console.log(err);
        });


        //Tab 7 - News Releases
        var park_url = 'https://developer.nps.gov/api/v1/newsreleases?parkCode=' + parkData.parkCode + '&api_key=' + api_key;

        fetch(park_url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var arr_nw = data.data;
            
            var app = document.getElementById('tab7');
            var contain = document.createElement('div');
            contain.setAttribute('class', 'contain');
            app.appendChild(contain);

            //if json is empty 
            if (arr_nw.length == 0) {
                var title_none = document.createElement('h2');
                title_none.setAttribute('class', 'info-content');
                title_none.textContent = 'No Results'
                contain.appendChild(title_none);
            }

            for (var i = 0; i < arr_nw.length; i++) {
                var card = document.createElement('div')
                card.setAttribute('class', 'card')

                var nw_name = document.createElement('h3')
                nw_name.setAttribute('class', 'info-content')
                nw_name.textContent = arr_nw[i].title;

                //site
                var nw_title_site = document.createElement('p')
                nw_title_site.setAttribute('class', 'info-content info-header')
                nw_title_site.textContent = 'Associated Site: '

                var nw_site = document.createElement('p')
                nw_site.setAttribute('class', 'info-content')
                nw_site.textContent = arr_nw[i].url

                //description
                var nw_title_des = document.createElement('p')
                nw_title_des.setAttribute('class', 'info-content info-header')
                nw_title_des.textContent = 'Description: '

                var nw_des = document.createElement('p')
                nw_des.setAttribute('class', 'info-content')
                nw_des.textContent = arr_nw[i].abstract

                //image
                var img_contain = document.createElement('div')
                img_contain.setAttribute('class', 'contain-img landscape')
                card.appendChild(img_contain)
                var nw_img = document.createElement('img')
                nw_img.setAttribute('class', 'info-img')
                nw_img.src = arr_nw[i].image.url
                

                contain.appendChild(card)
                card.appendChild(nw_name) 
                var break_line1 = document.createElement('br');
                card.appendChild(break_line1)
                card.appendChild(nw_title_site)
                card.appendChild(nw_site)
                var break_line2 = document.createElement('br');
                card.appendChild(break_line2)
                card.appendChild(nw_title_des)
                card.appendChild(nw_des)    
                img_contain.appendChild(nw_img)
                
                
            }

        })
        .catch(function (err) {
            console.log(err);
        });


        //Tab 8 - Education

        /*Lesson Plans*/
        var park_url = 'https://developer.nps.gov/api/v1/lessonplans?parkCode=' + parkData.parkCode + '&api_key=' + api_key;

        fetch(park_url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var arr_lp = data.data;
            
            var app = document.getElementById('tab8');
            var contain = document.createElement('div');
            contain.setAttribute('class', 'contain');
            app.appendChild(contain);
            
            var title_lp = document.createElement('h2');
            title_lp.setAttribute('class', 'info-content');
            title_lp.textContent = 'Lesson Plans'
            contain.appendChild(title_lp);

            //if json is empty 
            if (arr_lp.length == 0) {
                var title_none = document.createElement('h2');
                title_none.setAttribute('class', 'info-content');
                title_none.textContent = 'No Results'
                contain.appendChild(title_none);
            }

            for (var i = 0; i < arr_lp.length; i++) {
                var card = document.createElement('div')
                card.setAttribute('class', 'card')

                var lp_name = document.createElement('h3')
                lp_name.setAttribute('class', 'info-content')
                lp_name.textContent = arr_lp[i].title;

                //subject
                var lp_title_sub = document.createElement('p')
                lp_title_sub.setAttribute('class', 'info-content info-header')
                lp_title_sub.textContent = 'Subject: '

                var lp_sub = document.createElement('p')
                lp_sub.setAttribute('class', 'info-content')
                lp_sub.textContent = arr_lp[i].subject;

                //grade level
                var lp_title_gr = document.createElement('p')
                lp_title_gr.setAttribute('class', 'info-content info-header')
                lp_title_gr.textContent = 'Grade Level: '

                var lp_gr = document.createElement('p')
                lp_gr.setAttribute('class', 'info-content')
                lp_gr.textContent = arr_lp[i].gradelevel;

                //duration
                var lp_title_dur = document.createElement('p')
                lp_title_dur.setAttribute('class', 'info-content info-header')
                lp_title_dur.textContent = 'Duration: '

                var lp_dur = document.createElement('p')
                lp_dur.setAttribute('class', 'info-content')
                lp_dur.textContent = arr_lp[i].duration;

                //site
                var lp_title_site = document.createElement('p')
                lp_title_site.setAttribute('class', 'info-content info-header')
                lp_title_site.textContent = 'Associated Site: '

                var lp_site = document.createElement('p')
                lp_site.setAttribute('class', 'info-content')
                lp_site.textContent = arr_lp[i].url

                //description
                var lp_title_des = document.createElement('p')
                lp_title_des.setAttribute('class', 'info-content info-header')
                lp_title_des.textContent = 'Description: '

                var lp_des = document.createElement('p')
                lp_des.setAttribute('class', 'info-content')
                lp_des.textContent = arr_lp[i].questionobjective
                

                contain.appendChild(card)
                card.appendChild(lp_name) 
                var break_line1 = document.createElement('br');
                card.appendChild(break_line1)
                card.appendChild(lp_title_sub)
                card.appendChild(lp_sub)
                var break_line2 = document.createElement('br');
                card.appendChild(break_line2)
                card.appendChild(lp_title_gr)
                card.appendChild(lp_gr)
                var break_line3 = document.createElement('br');
                card.appendChild(break_line3)
                card.appendChild(lp_title_dur)
                card.appendChild(lp_dur)
                var break_line4 = document.createElement('br');
                card.appendChild(break_line4)
                card.appendChild(lp_title_site)
                card.appendChild(lp_site)
                var break_line5 = document.createElement('br');
                card.appendChild(break_line5)
                card.appendChild(lp_title_des)
                card.appendChild(lp_des)
                
            }

        })
        .catch(function (err) {
            console.log(err);
        });

        /*People*/
        var park_url = 'https://developer.nps.gov/api/v1/people?parkCode=' + parkData.parkCode + '&api_key=' + api_key;

        fetch(park_url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var arr_pp = data.data;
            
            var app = document.getElementById('tab8');
            var contain = document.createElement('div');
            contain.setAttribute('class', 'contain');
            app.appendChild(contain);

            var title_pp = document.createElement('h2');
            title_pp.setAttribute('class', 'info-content');
            title_pp.textContent = 'People'
            contain.appendChild(title_pp);
            var title_break = document.createElement('br');
            

            //if json is empty 
            if (arr_pp.length == 0) {
                var title_none = document.createElement('h2');
                title_none.setAttribute('class', 'info-content');
                title_none.textContent = 'No Results'
                contain.appendChild(title_none);
            }

            for (var i = 0; i < arr_pp.length; i++) {
                var card = document.createElement('div')
                card.setAttribute('class', 'card')

                var pp_name = document.createElement('h3')
                pp_name.setAttribute('class', 'info-content')
                pp_name.textContent = arr_pp[i].title;

                //site
                var pp_title_site = document.createElement('p')
                pp_title_site.setAttribute('class', 'info-content info-header')
                pp_title_site.textContent = 'Associated Site: '

                var pp_site = document.createElement('p')
                pp_site.setAttribute('class', 'info-content')
                pp_site.textContent = arr_pp[i].url

                //description
                var pp_title_des = document.createElement('p')
                pp_title_des.setAttribute('class', 'info-content info-header')
                pp_title_des.textContent = 'Description: '

                var pp_des = document.createElement('p')
                pp_des.setAttribute('class', 'info-content')
                pp_des.textContent = arr_pp[i].listingdescription

                //image
                var img_contain = document.createElement('div')
                img_contain.setAttribute('class', 'contain-img landscape')
                card.appendChild(img_contain)
                var pp_img = document.createElement('img')
                pp_img.setAttribute('class', 'info-img')
                pp_img.src = arr_pp[i].listingimage.url
                

                contain.appendChild(card)
                card.appendChild(pp_name) 
                var break_line1 = document.createElement('br');
                card.appendChild(break_line1)
                card.appendChild(pp_title_site)
                card.appendChild(pp_site)
                var break_line2 = document.createElement('br');
                card.appendChild(break_line2)
                card.appendChild(pp_title_des)
                card.appendChild(pp_des)    
                img_contain.appendChild(pp_img)
                
                
            }

        })
        .catch(function (err) {
            console.log(err);
        });

        /*Places*/
        var park_url = 'https://developer.nps.gov/api/v1/places?parkCode=' + parkData.parkCode + '&api_key=' + api_key;

        fetch(park_url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var arr_pl = data.data;
            
            var app = document.getElementById('tab8');
            var contain = document.createElement('div');
            contain.setAttribute('class', 'contain');
            app.appendChild(contain);

            var title_pl = document.createElement('h2');
            title_pl.setAttribute('class', 'info-content');
            title_pl.textContent = 'Places'
            contain.appendChild(title_pl);

            //if json is empty 
            if (arr_pl.length == 0) {
                var title_none = document.createElement('h2');
                title_none.setAttribute('class', 'info-content');
                title_none.textContent = 'No Results'
                contain.appendChild(title_none);
            }

            for (var i = 0; i < arr_pl.length; i++) {
                var card = document.createElement('div')
                card.setAttribute('class', 'card')

                var pl_name = document.createElement('h3')
                pl_name.setAttribute('class', 'info-content')
                pl_name.textContent = arr_pl[i].title;

                //site
                var pl_title_site = document.createElement('p')
                pl_title_site.setAttribute('class', 'info-content info-header')
                pl_title_site.textContent = 'Associated Site: '

                var pl_site = document.createElement('p')
                pl_site.setAttribute('class', 'info-content')
                pl_site.textContent = arr_pl[i].url

                //description
                var pl_title_des = document.createElement('p')
                pl_title_des.setAttribute('class', 'info-content info-header')
                pl_title_des.textContent = 'Description: '

                var pl_des = document.createElement('p')
                pl_des.setAttribute('class', 'info-content')
                pl_des.textContent = arr_pl[i].listingdescription

                //image
                var img_contain = document.createElement('div')
                img_contain.setAttribute('class', 'contain-img landscape')
                card.appendChild(img_contain)
                var pl_img = document.createElement('img')
                pl_img.setAttribute('class', 'info-img')
                pl_img.src = arr_pl[i].listingimage.url
                

                contain.appendChild(card)
                card.appendChild(pl_name) 
                var break_line1 = document.createElement('br');
                card.appendChild(break_line1)
                card.appendChild(pl_title_site)
                card.appendChild(pl_site)
                var break_line2 = document.createElement('br');
                card.appendChild(break_line2)
                card.appendChild(pl_title_des)
                card.appendChild(pl_des)    
                img_contain.appendChild(pl_img)
                
                
            }

        })
        .catch(function (err) {
            console.log(err);
        });
    
}

window.onload = start();


