function toggle() {
    navbar_container = document.getElementsByClassName("navbar-back");
    for (const element of navbar_container) {
        element.classList.toggle("active-menu")
    }
    navbar_links = document.getElementsByClassName("navbar-links");
    for (const element of navbar_links) {
        element.classList.toggle("active-menu")
    }
    navbar_toggle = document.getElementsByClassName("navbar-toggle");
    for (const element of navbar_toggle) {
        element.classList.toggle("active-menu")
    }
}