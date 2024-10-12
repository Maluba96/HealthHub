document.addEventListener("DOMContentLoaded", function () {
    var spinner = document.getElementById("spinner");

    window.addEventListener("load", function () {
        if (spinner) {
            spinner.classList.remove("show");
        }
    });

    setTimeout(function () {
        if (spinner && spinner.classList.contains("show")) {
            spinner.classList.remove("show");
            console.log("Spinner removed due to timeout");
        }
    }, 10000); 
    
    window.onload = function() {
        document.getElementById('spinner').style.display = 'none';
    };
    
});
