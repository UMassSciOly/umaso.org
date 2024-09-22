function toggle_mission() {
    mission_details = document.getElementById("mission-details");
    mission_toggle = document.getElementById("mission-toggle");
    mission_details.classList.toggle("active");
    mission_toggle.classList.toggle("active");
}

class Organizer {
    constructor(name, major, year, teams) {
        this.name = name;
        this.major = major;
        this.year = year;
        // this.teams = teams.split(", ");
    }
}

async function load_organizers() {
    const response = await fetch("organizer_info.csv")
    const response_text = await response.text()
    const organizers = response_text.split("\n").map(row => new Organizer(...row.trim().split(",")));
    return organizers.slice(1);
}

async function load_pfp_extension_map() {
    const response = await fetch("pfp_img_list.json");
    return response.json();
}

// const profile_grid = document.getElementsByClassName("profile-grid")[0];
const organizers = load_organizers()

// <div class="profile grid-item">
//     <img src="img/pfp/Ben_Kuchma.jpg">
//     <h3>Ben Kuchma</h3>
//     <p>Physics + Computer Science 2025</p>
// </div>

async function toggle_profiles(curr_btn) {
    const profile_grid = document.getElementsByClassName("profile-grid")[0];
    const profile_btns = document.getElementsByClassName("profile-btns")[0]
    curr_btn.classList.add("active");
    for (const btn of profile_btns.children) {
        if (btn !== curr_btn) {
            btn.classList.remove("active");
        }
    }
    const pfp_extension_map = await load_pfp_extension_map()
    console.log(pfp_extension_map["Ben_Kuchma"])
    const organizer_list = await organizers;
    for (const organizer of organizer_list) {
        const profile_container = document.createElement("div");
        const profile_img = document.createElement("img");
        const profile_name = document.createElement("h3");
        const profile_text = document.createElement("p");
        const organizer_file_name = organizer.name.replace(" ", "_");
        profile_container.classList.add("profile", "grid-item");
        profile_img.src = `./img/pfp/${organizer_file_name}.${pfp_extension_map[organizer_file_name]}`;
        profile_name.innerHTML = organizer.name;
        profile_text.innerHTML = organizer.major;
        profile_container.appendChild(profile_img);
        profile_container.appendChild(profile_name);
        profile_container.appendChild(profile_text);
        profile_grid.appendChild(profile_container);
    }
}

