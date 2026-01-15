// QUERY PARAMS

const params = new URLSearchParams(window.location.search);
const target = params.get("for");
let greeter = document.querySelector("#greeter");
let logline = document.querySelector("#logline");

if (target) {
    console.log(target);
    sessionStorage.setItem("audience", target);
}

let audience = sessionStorage.getItem("audience");
let projectsOrdering = [0, 1, 2, 3, 4, 5];

customizeSite(audience);

function customizeSite(target) {
    
    let name;
    let message;

    switch(target) {
        case "msi":
            name = "Motorola";
            projectsOrdering = [0, 1, 2, 3, 4, 5];
            break;
        case "ea":
            name = "Electronic Arts";
            break;
        case "mike":
            name = "Mike";
            projectsOrdering = [5, 4, 3, 2, 1, 0]
            break;
        case "ilm":
            name = "ILM";
            message = "You've found a software engineer with a passion for 3D and proficiency in creating human-centered UI/UX experiences."
            projectsOrdering = [4, 2, 3, 0, 1, 5]
        default:
            projectsOrdering = [4, 2, 3, 0, 1, 5]
            break;
    }

    console.log(`Customizing site for: ${name || "general audience"}`);

    if (!greeter) return;
    greeter.textContent = `Hey ${name || "there"}!`;
    if (!message || !logline) return;
    logline.textContent = message;
}


// IMAGE SELECTORS

let imageSelect = document.querySelectorAll("ul.image-select li");

imageSelect.forEach(
    (item) => {
        item.addEventListener("click", () => {
            imageSelect.forEach(
                (otherItem) => {
                    if (item.parentElement.getAttribute("for") === otherItem.parentElement.getAttribute("for")) {
                        otherItem.classList.remove("active");
                    }
                }
            );
            item.classList.add("active");
            let targetImg = document.querySelector("#" +item.parentElement.getAttribute("for"));
            targetImg.src = item.getAttribute("img-src");
        });
    }
);

// SCROLL PUSH AWAY EFFECT

// let mainHeight;
// const main = document.querySelector('.main');
// const projectsMain = document.querySelector('.projects-main');
// const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

// // Wait for everything to load
// window.addEventListener('load', () => {
//   setTimeout(() => {
//         mainHeight = main ? main.getBoundingClientRect().height : 0;
//   }, 100);
// });

// window.addEventListener('resize', () => {
//     setTimeout(() => {
//         mainHeight = main ? main.getBoundingClientRect().height : 0;
//     }, 100);
// });

// window.addEventListener('scroll', () => {
//   if (!main) return;
  
//   const scrolled = window.scrollY;
  
//   // Only transform while scrolled distance is less than main height
//   if (scrolled < mainHeight - 3.5*rootFontSize) { // 4rem in px
//     // main.style.transform = `translateY(-${scrolled}px)`;
//     projectsMain.style.position = 'fixed';
//     main.style.position = 'relative';
//     main.style.top = ""; // 4rem in px
//     projectsMain.style.top = `4rem`;


//   } else {
//     // Once past main, remove transform and let it scroll normally
//     // main.style.transform = 'none';
//     projectsMain.style.position = 'relative';
//     main.style.position = 'fixed';
//     // main.style.top = `-${mainHeight + 2*rootFontSize}px`;

//     // main.offsetHeight;
//     projectsMain.style.top = `7rem`;
//     console.log(`mainHeight: ${mainHeight}px`);
//     main.style.top = `calc(-${mainHeight}px + 3.5rem)`;
//   }
// });

// GENERAL

let navLinks = document.querySelectorAll("nav ul li a");

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// THUMBNAIL ORDERING + SUGGESTED THUMBNAIL

// Get the parent container of all thumbnails
let container;
if (document.querySelector('.project-thumbnail')) {
    container = document.querySelector('.project-thumbnail').parentElement;

    // Get all thumbnails
    const thumbnails = Array.from(document.querySelectorAll('.project-thumbnail'));

    let thumbnailsSorted = [...thumbnails];

    // Sort: non-closed first, then closed
    projectsOrdering.sort((a, b) => {
    const aIsClosed = thumbnails[a].classList.contains('closed');
    const bIsClosed = thumbnails[b].classList.contains('closed');
    
    if (aIsClosed && !bIsClosed) return 1;  // a goes after b
    if (!aIsClosed && bIsClosed) return -1; // a goes before b
    return 0; // keep original order
    });

    for (i = 0; i < projectsOrdering.length; i ++) {
        thumbnailsSorted[i] = thumbnails[projectsOrdering[i]];
    }

    // Re-append in sorted order
    thumbnailsSorted.forEach(thumbnail => {
    container.appendChild(thumbnail);
    });
}

const profileImg = document.querySelector("#profile-img");
const profileDesc = document.querySelector("#cappf");
const profileFig = document.querySelector("#profile-fig");

if (profileImg && profileDesc) {
    const profthumbnails = ["imgs/fs1.png", "imgs/moa.png", "imgs/petAdop.png", "imgs/kt.png", "imgs/alienAttack.png", "imgs/posters.png"];
    const profDescriptions = ["UX design", "Experience design", "UI design", "Motion graphics", "Graphical programming", "Graphic design"];
    const profAligns = ["left", "right", "left", "left", "left", "left"];
    const profLinks = ["fuorisalone.html", "moaDesign.html", "left", "left", "left", "left"];

    profileImg.setAttribute("src", profthumbnails[projectsOrdering[0]]);
    profileDesc.firstChild.textContent = profDescriptions[projectsOrdering[0]] + " project - check it out!";
    profileImg.style["object-position"] = profAligns[projectsOrdering[0]];

    profileFig.children[0].children[0].setAttribute("href", profLinks[projectsOrdering[0]]);
    profileFig.children[1].setAttribute("href", profLinks[projectsOrdering[0]]);
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

        let instanceColoringSize = instanceColoring.getBoundingClientRect().width / parseFloat(getComputedStyle(document.documentElement).fontSize); //rem

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
            let xOffset = Math.cos(Math.atan2(posY, posX))*instanceColoringSize*16;
            let yOffset = Math.sin(Math.atan2(posY, posX))*instanceColoringSize*16;

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
            let xOffset = Math.cos(Math.atan2(posY, posX))*instanceColoringSize*16;
            let yOffset = Math.sin(Math.atan2(posY, posX))*instanceColoringSize*16;

            instance.children[0].style.left = `calc((${xOffset + rect.width/2}px - ${instanceColoringSize/2}rem))`;
            instance.children[0].style.top = `calc((${yOffset + rect.height/2}px - ${instanceColoringSize/2}rem))`;

            // follower.style.transform = "translate(-50%, -50%)";
        });
    }
);

// LINES1 SCROLL ANIMATION
const lines1 = document.getElementById('lines1');
const main = document.querySelector('.main');

window.addEventListener('scroll', () => {
  if (!main || !lines1) return;
  
  const scrolled = window.scrollY;
  const moveDistance = scrolled * 0.5; // Adjust multiplier for speed
  
  lines1.style.transform = `translateX(${moveDistance}px)`;
});


// SLIDEY LINES

const mainLine = document.querySelector('#slidey-text-line');
const otherLines = document.querySelectorAll('.slidey-line');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const focusOffset = window.innerHeight/2 - mainLine.getBoundingClientRect().top - mainLine.getBoundingClientRect().height / 2;
    console.log(`focusOffset: ${Math.pow(focusOffset, 3/2)}px`);

    console.log(Math.round(Math.log2(focusOffset)));
    // mainLine.style.transform = `translateX(calc(28rem + ${Math.pow(focusOffset, 3)/200000}px))`;

    otherLines.forEach(
        (line, index) => {
            let direction = (index % 2 === 0) ? -1 : 1;
            line.style.transform = `translateX(calc(${direction * 28}rem + ${direction * Math.sign(focusOffset) * Math.pow(Math.abs(focusOffset), 3/2)/40}px))`;
        }
    );
});

window.addEventListener('load', () => {
  setTimeout(() => {
        mainHeight = mainLine ? mainLine.getBoundingClientRect().height : 0;
  }, 100);
});