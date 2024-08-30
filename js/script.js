const to_desktop_media_query = window.matchMedia("(min-width: 1024px)");
const to_mobile_media_query = window.matchMedia("(max-width: 1024px)");
to_desktop_media_query.addEventListener("change", handle_desktop);
to_mobile_media_query.addEventListener("change", handle_mobile);

document.addEventListener("DOMContentLoaded", () => {
    handle_desktop(to_desktop_media_query);
    handle_mobile(to_mobile_media_query);
})


function handle_desktop(jmediaquery) {
    navbar_links = document.getElementsByClassName("navbar-links")[0];
    if (jmediaquery.matches) {
        navbar_links.classList.add("hidden");
        setTimeout(() => {
            navbar_links.classList.remove("hidden");
        }, 400);
        console.log("desktop")

        if (navbar_links.classList.contains("active-menu")) {
            toggle();
        }
    }
}

function handle_mobile(jmediaquery) {
    navbar_links = document.getElementsByClassName("navbar-links")[0];
    if (jmediaquery.matches) {
        navbar_links.classList.add("hidden");
    }
}

function toggle() {
    const navbar_list = document.getElementById("navbar-link-list");
    setTimeout(() => {
        navbar_list.classList.toggle("vertical")
        navbar_list.classList.toggle("horizontal")
    }, 400);

    const navbar_container = document.getElementsByClassName("navbar-content");
    for (const element of navbar_container) {
        element.classList.toggle("active-menu")
    }
    const navbar_back = document.getElementsByClassName("navbar-back");
    for (const element of navbar_back) {
        element.classList.toggle("active-menu")
    }
    const navbar_fade = document.getElementsByClassName("navbar-fade");
    for (const element of navbar_fade) {
        element.classList.toggle("active-menu")
    }
    const navbar_links = document.getElementsByClassName("navbar-links");
    for (const element of navbar_links) {
        element.classList.toggle("active-menu")
    }
    const navbar_toggle = document.getElementsByClassName("navbar-toggle");
    for (const element of navbar_toggle) {
        element.classList.toggle("active-menu")
    }
    document.body.style.overflow = document.body.style.overflow == "hidden" ? "visible" : "hidden";
}