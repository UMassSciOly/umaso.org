const navbar = localStorage.getItem("navbar");
if (navbar) {
   document.getElementById("navbar").innerHTML = navbar;
} else {
    fetch("/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar").innerHTML = data
            localStorage.setItem("navbar", data);
        });
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