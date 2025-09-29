const profile_grid = document.getElementsByClassName("profile-grid")[0];
const profile_btns = document.getElementsByClassName("profile-btns")[0];
const mission_details = document.getElementsByClassName("mission-details")[0];
const mission_toggle = document.getElementsByClassName("mission-toggle")[0];
console.log(mission_toggle)

function toggle_mission() {
    const mission_icon = mission_toggle.children[0];
    mission_toggle.style.opacity = 0;

    mission_details.classList.toggle("active");
    mission_toggle.classList.toggle("active");

    setTimeout(() => {
        if (mission_icon.innerHTML.trim() === "keyboard_arrow_down") {
            mission_icon.innerHTML = "keyboard_arrow_up";
        } else {
            mission_icon.innerHTML = "keyboard_arrow_down"
        }
        mission_toggle.style.opacity = 1;
    }, 250)
}

class Organizer {
    constructor(name, major, year, teams) {
        this.name = name;
        this.file_name = name.replace(" ", "_");
        this.info = `${major} ${year}`;
        // this.teams = teams.split(", ");
    }
}

class EventInfo {
    constructor(name, is_trial, ES, TR) {
        console.log([name, is_trial])
        this.name = name + (is_trial === "TRUE" ? "*" : "");
        this.ES = ES.split(".");
        this.TR = TR.split(".");
    }
}

async function load_organizers() {
    const response = await fetch("/organizer_info.csv");
    const response_text = await response.text();
    const organizers = response_text.split("\n").map(row => new Organizer(...row.trim().split(",")));
    return organizers.slice(1);
}

async function load_events() {
    const response = await fetch("/event-members.csv");
    const response_text = await response.text();
    const events = response_text.split("\n").map(row => new EventInfo(...row.trim().split(",")));
    return events.slice(1);
}

async function load_pfp_extension_map() {
    const response = await fetch("/pfp_img_list.json");
    return response.json();
}

async function load_organizer_profiles() {
    const pfp_extension_map = await load_pfp_extension_map();
    const organizer_list = await organizers;
    for (const organizer of organizer_list) {
        let img_path = "/img/pfp/default.png";
        console.log(organizer.file_name);
        if(organizer.file_name === "Grace_von Zabern"){
            // organizer.file_name === "Grace_von_Zabern";
             img_path = `/img/pfp/${"Grace_von_Zabern"}.png`;
            // console.log(img_path);
        }
        if (organizer.file_name in pfp_extension_map) {
            img_path = `/img/pfp/${organizer.file_name}.png`;
            console.log(img_path);
        }
        create_organizer_profile(organizer, img_path, false);
    }
}

function create_organizer_profile(organizer, img_path, is_hidden) {
    const profile_container = document.createElement("div");
    const profile_img = document.createElement("img");
    const profile_title = document.createElement("h3");
    const profile_text = document.createElement("p");

    profile_container.classList.add("profile", "grid-item");
    if (is_hidden) {
        profile_container.classList.add("hidden");
    }

    profile_container.dataset.id = "organizer";
    profile_img.src = img_path;
    profile_title.innerHTML = organizer.name;
    profile_text.innerHTML = organizer.info;
    profile_container.appendChild(profile_img);
    profile_container.appendChild(profile_title);
    profile_container.appendChild(profile_text);
    profile_grid.appendChild(profile_container);

    requestAnimationFrame(() => {
        setTimeout(() => {
            profile_container.classList.add("visible");
        }, 200)
        
    });
}

async function load_event_profiles() {
    const events_list = await events;
    events_list.forEach(curr_event => create_event_profile(curr_event, true));
}

function create_event_profile(event_obj, is_hidden) {
    const profile_container = document.createElement("div");
    const event_title_container = document.createElement("div");
    const event_title = document.createElement("h1");
    const member_container = document.createElement("div");
    const ES_container = document.createElement("div");
    const TR_container = document.createElement("div");

    for (const event_member of event_obj.ES) {
        const member = document.createElement("div");
        member.innerHTML = event_member;
        ES_container.appendChild(member);
        member.classList.add("event-member");
    }

    for (const event_member of event_obj.TR) {
        const member = document.createElement("div");
        member.innerHTML = event_member;
        TR_container.appendChild(member);
        member.classList.add("event-member");
    }
    
    profile_container.classList.add("event-profile2", "grid-item");
    if (is_hidden) {
        profile_container.classList.add("hidden");
    }

    profile_container.dataset.id = "event-member";
    event_title_container.classList.add("event-title");
    ES_container.classList.add("ES-section");
    TR_container.classList.add("TR-section");
    event_title.innerHTML = event_obj.name;

    profile_container.appendChild(event_title_container);
    profile_container.appendChild(member_container);
    event_title_container.appendChild(event_title);
    member_container.appendChild(ES_container);
    member_container.appendChild(TR_container);
    profile_grid.appendChild(profile_container);
}

const organizers = load_organizers();
const events = load_events();
load_organizer_profiles()
load_event_profiles()

async function toggle_profiles(curr_btn) {
    curr_btn.classList.add("active");
    for (const btn of profile_btns.children) {
        if (btn !== curr_btn) {
            btn.classList.remove("active");
        }
    }
    const active_view = curr_btn.getAttribute("data-id");
    for (const profile of profile_grid.children) {
        if (active_view === profile.getAttribute("data-id")) {
            profile.classList.remove("hidden");
            setTimeout(() => {
                profile.classList.add("visible");
            }, 150);
        } else {
            profile.classList.add("hidden");
            profile.classList.remove("visible");
        }
    }
}

