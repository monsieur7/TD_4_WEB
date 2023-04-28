//var active = false;
var which_active = null;
function generateFields() {
    const field_parts = document.getElementsByTagName("field-parts")[0];
    for (let i = 0; i < 25; i++) {
        let temp = document.createElement("field-part")
        temp.classList.add("grass");
        temp.addEventListener("click", action);
        field_parts.appendChild(temp);
    }
    setTimeout(grow, 1e3);

}
document.addEventListener("DOMContentLoaded", generateFields);
function attachToolEvent() {
    let tool = document.getElementsByTagName("tool");

    for (let i of tool) {
        i.addEventListener("click", (e) => {
            let target = e.target;
            if (!target.classList.contains("active")) {
                which_active = target;
                console.log("image ", window.getComputedStyle(target).backgroundImage)
                //document.querySelector("body").style.cursor = window.getComputedStyle(target).backgroundImage + "92 92,auto";
                //console.log(" cursor ", document.querySelector("body").style.cursor);
                console.log("active");
                //active = true;
                target.classList.toggle("active");
                for (let j of tool) {
                    if (j != target && j.classList.contains("active")) {
                        j.classList.remove("active");
                    }
                }
            }
            //activated ? if so remove
            else if (target.classList.contains("active")) {
                target.classList.remove("active");
                //active = false;
                console.log("removed");
                which_active = null;
            }
        })
    };
    console.log("loaded !")
};
document.addEventListener("DOMContentLoaded", attachToolEvent);
function action(e) {
    console.log("active ", which_active.id)
    if (which_active != null) {
        if (which_active.id == "tool-hoe") {
            if (e.target.classList.contains("grass")) {
                e.target.classList.remove("grass");
                e.target.classList.add("farmland");
                e.target.dataset.seed = 0;

            }
        }
        else if (which_active.id == "tool-water") {
            if (e.target.classList.contains("farmland")) {
                e.target.classList.add("hydrated");
                console.log("classes ", e.target.classList)
                setTimeout(hydrated, 10e3, e.target);

            }
        }
        else if (which_active.id == "tool-sow") {
            if (e.target.classList.contains("farmland")) {
                e.target.dataset.seed = 1;
            }
        }
        else if (which_active.id == "tool-harvest") {
            let seed = parseInt(e.target.dataset.seed)
            if (seed != 0) {
                if (seed == 7) {
                    let wheat = parseInt(document.getElementById("stock-wheat").innerText);
                    wheat += 1;
                    document.getElementById("stock-wheat").innerText = wheat;
                }
                e.target.dataset.seed = "0";

            }
        }
    }
}
function grow() {
    let field = document.getElementsByTagName("field-parts")[0];
    for (let i = 0; i < field.children.length; i++) {
        //console.log("childrens ", field.children[i]);
        let seed = parseInt(field.children[i].dataset.seed);
        console.log("seed ", seed);
        if (seed != 0 && seed < 7) {
            let proba = 5 / 100;
            if (field.children[i].classList.contains("hydrated")) {
                proba = 30 / 100;
            }
            (Math.random() <= proba) ? seed += 1 : seed == seed;
        }



        if (seed == 0) {
            console.log("testing removed farmland");
            if (Math.random() <= 0.01 && !field.children[i].classList.contains("hydrated")) {
                if (field.children[i].classList.contains("farmland")) {
                    field.children[i].classList.remove("farmland");
                    field.children[i].classList.add("grass");
                    console.log("removed farmland");
                }

            }
        }
        field.children[i].dataset.seed = seed;

    }
    setTimeout(grow, 1e3);

}

function hydrated(field) {
    if (field.classList.contains("hydrated")) {
        field.classList.remove("hydrated");
    }
}