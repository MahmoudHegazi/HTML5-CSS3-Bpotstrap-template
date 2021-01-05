// 1. Add the map css as a static file to the map (same as you do with javascript)
// 2. Get all the serialized data model for the Entity (sql...)
// 3. Copy the template above, but replace the variables inside data-name and data-category
// <button onclick="visit(event)" data-name="My Name 1" data-category="My Category 1">Visit</button>
// 4.
document.head.innerHTML +=
  '<link rel="icon" href="/templates/static/locationlogo.jpg" type="image/jpg" sizes="16x16" />';

let privous_id = [];
let privous_button = [];
function hi(name, cat, e) {
  //console.log(`No Need Form Or hidden Input Name : ${name} Cat: ${cat}`);
  let event_owner_pop_id = e.target.parentNode.id;
  let event_owner_popup = document.getElementById(event_owner_pop_id);

  var myHeaders = new Headers();
  let all_overlays1 = document.querySelectorAll(".overlay_class");
  let all_over_removers1 = document.querySelectorAll(".ov_remover");

  all_overlays1.forEach((over) => {
    over.remove();
  });
  all_over_removers1.forEach((remover) => {
    remover.remove();
  });

  privous_button.forEach((old_btn) => {
    old_btn.style.display = "block";
  });

  var myInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  fetch("/map?name=" + name + "&category=" + cat, myInit)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const overlayEl = document.createElement("div");
      overlayEl.id = "overlay";
      overlayEl.className = "overlay_class";
      overlayEl.classList.add("hidden");
      overlayEl.innerText = "";
      let the_map_container = document.querySelector(".folium-map");

      let mydata = data;
      let v_name = data["name"];
      let ve_category = data["category"];
      let ve_address = data["address"];
      let ve_dailyinformation = data["dailyinformation"];
      let ve_seats = data["seats"];
      let ve_menu = data["ve_menu"];
      let ve_workingtime = data["workingtime"];
      let ve_website = data["website"];
      let ve_rest = data["ve_rest"];
      let ve_createdatastamp = data["ve_createdatastamp"];
      let cod = data["cod"];
      let message = data["message"];
      if (cod == 200) {
        console.log("The User Want to visit " + v_name);
        overlayEl.classList.remove("hidden");
        overlayEl.classList.add("show");
        let new_delete_btn = document.createElement("button");
        new_delete_btn.textContent = "Hide " + v_name + " Details";
        new_delete_btn.style.background = "lightblue";
        new_delete_btn.style.padding = "5px";
        new_delete_btn.classList.add("ov_remover");
        privous_button.push(e.target);
        new_delete_btn.addEventListener("click", () => {
          let all_overlays = document.querySelectorAll(".overlay_class");
          let all_over_removers = document.querySelectorAll(".ov_remover");
          let the_appendedlink = document.querySelector(".appendedlink");

          all_overlays.forEach((over) => {
            over.remove();
          });
          all_over_removers.forEach((remover) => {
            remover.remove();
          });
          privous_button.forEach((old_btn) => {
            old_btn.style.display = "block";
          });
          the_appendedlink.style.display = "none";
        });

        // create new link for website and appendit

        //let newlnk = document.createElement("a");
        //newlnk.href = ve_website;
        //newlnk.textContent = ve_website;
        //newlnk.style.color = "white";
        //newlnk.style.background = "crimson";
        //newlnk.style.padding = "5px";
        //newlnk.style.fontFamily = "impact";
        //newlnk.className = "appended_websitelink";
        event_owner_popup.append(new_delete_btn);
        let the_appendedlink = document.querySelector(".appendedlink");
        the_appendedlink.href = "http://" + ve_website + "/";
        the_appendedlink.textContent = ve_website;
        the_appendedlink.style.background = "crimson";
        the_appendedlink.style.color = "white";
        the_appendedlink.style.padding = "5px";
        the_appendedlink.style.fontFamily = "New Time Roman";
        the_appendedlink.style.display = "block";
        //overlayEl.classList.add("leaflet-popup");
        //overlayEl.classList.add("leaflet-zoom-animated");

        overlayEl.innerHTML = `
        <div  id="overlay_con" style="padding:10%;background-color:lightblue;border:2px solid crimson;border-radius:3%;opacity:0.9;">
        <div class="overlay_container">
                                 <ul>
                                 <li> <b>Name :</b> <span>  ${v_name}</span></li><hr />
                                 <li> <b>Category :</b>  <span>  ${ve_category}</span></li><hr />
                                 <li> <b>Address :</b>  <span> ${ve_address}</span></li><hr />
                                 <li> <b>Dailyinformation :</b>  <span> ${ve_dailyinformation}</span></li><hr />
                                 <li> <b>Seats :</b>  <span> ${ve_seats}</span></li><hr />
                                 <li> <b>Menu :</b> <span> ${ve_menu}</span></li><hr />
                                 <li> <b>Workingtime :</b> <span>  ${ve_workingtime}</span></li><hr />
                                 <li> <b>Rest :</b> <span> ${ve_rest}</span></li><hr />
                                 <li> <b>Website :</b> <span> ${ve_website}</span></li>

                                 </ul>
                                 </div>
</div>
 `;
        let con_zoom = document.querySelector(".leaflet-top");
        con_zoom.appendChild(overlayEl);
        //event_target_btn.style.display = "none";
        privous_button.forEach((old_btn) => {
          old_btn.style.display = "none";
        });
      } else {
        console.log(
          "There was an error in the City/ or not found in db" + message
        );
        //alert("Sorry We Did Not Find Information for " + name);
        let all_overlays = document.querySelectorAll(".overlay_class");
        let all_over_removers = document.querySelectorAll(".ov_remover");
        let the_appendedlink = document.querySelector(".appendedlink");

        all_over_removers.forEach((remover) => {
          remover.remove();
        });
        privous_button.forEach((old_btn) => {
          old_btn.style.display = "block";
        });
        the_appendedlink.style.display = "none";
      }
      //console.log("my Awesome Data: \n" + data);
    });
}

window.addEventListener("DOMContentLoaded", (event) => {
  const allicons = document.querySelectorAll(".leaflet-marker-icon");

  allicons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      let check_overlay = document.getElementById("overlay");

      if (check_overlay) {
        console.log("Hide The Overlay..");
        check_overlay.remove();
      }
      let hide_buttons = document.querySelectorAll(".ov_remover");
      let visit_btns = document.querySelectorAll(".submit_btns");
      let the_appendedlink = document.querySelector(".appendedlink");
      console.log(e.target.style + "\n an new Icon Clicked Hide The Buttons ");

      // remove all hide buttons
      hide_buttons.forEach((button) => {
        console.log(button.innerText);
        button.remove();
      });
      // show all visit buttons
      visit_btns.forEach((vbutton) => {
        console.log(vbutton.innerText);
        vbutton.style.display = "block";
      });
      // remove all webstite links
      if (the_appendedlink) {
        the_appendedlink.style.display = "none";
      }
    });
  });

  // this optional step we can remove it (on click on the close buttons hide all overlay)

  // end of new step hide all overlay once closing clicked
});
