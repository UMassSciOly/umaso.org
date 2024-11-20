const navbar = localStorage.getItem("navbar");
if (navbar) {
    document.getElementById("navbar").innerHTML = navbar;
} else {
    fetch("/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar").innerHTML = data
            localStorage.setItem("navbar", data);
        })
        .then(handle_layouts);
}

const footer = localStorage.getItem("footer");
if (footer) {
    document.getElementById("footer").innerHTML = footer;
} else {
    fetch("/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data
            localStorage.setItem("footer", data);
        });
}

const to_desktop_media_query = window.matchMedia("(min-width: 768px)");
const to_mobile_media_query = window.matchMedia("(max-width: 768px)");
to_desktop_media_query.addEventListener("change", handle_desktop);
to_mobile_media_query.addEventListener("change", handle_mobile);

function handle_layouts() {
    handle_desktop(to_desktop_media_query);
    handle_mobile(to_mobile_media_query);
}

document.addEventListener("DOMContentLoaded", () => {
    if (navbar && footer) {
        handle_layouts();
    }
});

function handle_desktop(jmediaquery) {
    console.log("f");
    const navbar_links = document.getElementsByClassName("navbar-links")[0];
    if (jmediaquery.matches) {
        navbar_links.classList.add("hidden");
        setTimeout(() => {
            console.log("eeeeee");
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

    const navbar_container = document.getElementsByClassName("navbar-content")[0];
    navbar_container.classList.toggle("active-menu");

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