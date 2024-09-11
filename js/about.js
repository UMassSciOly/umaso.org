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
    const response = await fetch("organizers.csv")
    const response_text = await response.text()
    const organizers = response_text.split("\n").map(row => new Organizer(...row.split(",")));
    return organizers;
}

const organizers = load_organizers();
console.log(organizers)

function toggle_profiles(curr_btn) {
    profile_btns = document.getElementsByClassName("profile-btns")[0]
    curr_btn.classList.add("active");
    for (const btn of profile_btns.children) {
        if (btn !== curr_btn) {
            btn.classList.remove("active");
        }
    }
}

