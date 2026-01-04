let navLinks = document.querySelectorAll("nav ul li a");

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// QUERY PARAMS

const params = new URLSearchParams(window.location.search);
const target = params.get("for");
let greeter = document.querySelector("#greeter");


customizeSite(target);

function customizeSite(target) {
    
    let name;

    switch(target) {
        case "mrla":
            name = "Motorola";
            break;
        case "ea":
            name = "Electronic Arts";
            break;
        case "mike":
            name = "Mike";
            break;
        default:
            break;
    }

    console.log(`Customizing site for: ${name || "general audience"}`);
    greeter.textContent = `Hey ${name || "there"}!`;
}
//FOLLOWER ANIMATION!!!

// const follower = document.getElementById('follower');

// let followerX = 0, followerY = 0;

// animate();

// function animate() {
//   // Smooth interpolation (lerp)
//   followerX += (mouseX - followerX) * .1;
//   followerY += (mouseY - followerY) * .1;
  
//   follower.style.left = followerX + 'px';
//   follower.style.top = followerY + 'px';
  
//   requestAnimationFrame(animate);
// }

//WASH ANIMATIONS!!!

navLinks.forEach(
    (link) => {
        link.classList.add("washAnimate");
    }
);

let waInstances = document.querySelectorAll(".washAnimate");

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

waInstances.forEach(
    (instance) => {
        //create coloring and content
        let instanceColoring = document.createElement("div");
        let instanceContent = document.createElement("span");

        //slot in original text and add class to content and coloring
        instanceContent.textContent = instance.textContent;
        instance.textContent = "";
        instanceContent.classList.add("instanceContent");
        instanceColoring.classList.add("instanceColoring");

        //put em back in the instance
        instance.append(instanceColoring);
        instance.append(instanceContent);
        instance.setAttribute("data-label", instance.textContent);

        let instanceColoringSize = 15; //rem

        instanceColoring.style.width = `${instanceColoringSize}rem`;
        instanceColoring.style.height = `${instanceColoringSize}rem`;

        let rect;
        let posX;
        let posY;

        document.addEventListener("mousemove", (e) => {
            rect = instance.getBoundingClientRect();
            posX = mouseX - rect.left - rect.width/2;
            posY = mouseY - rect.top - rect.height/2;
        });

        instance.addEventListener("mouseenter", () => {
            rect = instance.getBoundingClientRect();
            let xOffset = Math.cos(Math.atan2(posY, posX))*300;
            let yOffset = Math.sin(Math.atan2(posY, posX))*300;

            if (instance.id == "clear") {
                console.log(`xOffset: ${xOffset}, yOffset: ${yOffset}`);
            }

            instance.children[0].classList.add("disableTransition");
            
            instance.children[0].style.left = `calc((${xOffset + rect.width/2}px - ${instanceColoringSize/2}rem))`;
            instance.children[0].style.top = `calc((${yOffset + rect.height/2}px - ${instanceColoringSize/2}rem))`;

            // follower.style.transform = "translate(-50%, -50%) scale(0.1)";

            instanceColoring.offsetHeight;

            instance.children[0].classList.remove("disableTransition");
            instance.children[0].style.left = `calc(50% - ${instanceColoringSize/2}rem)`;
            instance.children[0].style.top = `calc(50% - ${instanceColoringSize/2}rem)`;

        });

        instance.addEventListener("mouseleave", () => {
            rect = instance.getBoundingClientRect();
            let xOffset = Math.cos(Math.atan2(posY, posX))*300;
            let yOffset = Math.sin(Math.atan2(posY, posX))*300;

            instance.children[0].style.left = `calc((${xOffset + rect.width/2}px - ${instanceColoringSize/2}rem))`;
            instance.children[0].style.top = `calc((${yOffset + rect.height/2}px - ${instanceColoringSize/2}rem))`;

            // follower.style.transform = "translate(-50%, -50%)";
        });
    }
);
