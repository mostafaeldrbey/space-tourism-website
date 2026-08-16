let myData = [];

let tabButtons = document.querySelectorAll('.tab-btn');
let planetImage = document.getElementById('planetImage');
let planetTitle = document.getElementById('planetTitle');
let planetDescription = document.getElementById('planetDescription');
let planetDistance = document.getElementById('planetDistance');
let planetTravel = document.getElementById('planetTravel');

let crewButtons = document.querySelectorAll('.crew-btn');
let crewImage = document.getElementById('crewImage');
let crewTitle = document.getElementById('crewTitle');
let crewDescription = document.getElementById('crewDescription');
let crewTag = document.getElementById('crewTag');

let techButtons = document.querySelectorAll('.tech-btn');
let techImage = document.getElementById('techImage');
let techTitle = document.getElementById('techTitle');
let techDescription = document.getElementById('techDescription');

const exploreBtn = document.getElementById('exploreBtn');
const exploreToast = document.getElementById('exploreToast');
const closeToastBtn = document.getElementById('closeToastBtn');



fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        myData = data;
        initplanet();
        initCrew();
        initTech();
    })
    .catch(error => console.error('حصلت مشكلة في تحميل الملف:', error));

function initplanet() {

    if (!planetImage || !planetTitle) return;

    const destinations = myData.destinations;
    if (!destinations || destinations.length === 0) return;

    updatePlanetInfo(destinations[0]);

    tabButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            let index = e.target.getAttribute('data-index');
            let selected = destinations[index];

            const elementsToAnimate = [
                planetImage,
                planetTitle,
                planetDescription,
                planetDistance,
                planetTravel
            ];

            elementsToAnimate.forEach(el => el.classList.add('fade-out'));

            setTimeout(() => {

                elementsToAnimate.forEach(el => el.classList.remove('fade-out'));
            }, 300);

            updatePlanetInfo(selected);
        });
    });
}

function updatePlanetInfo(selected) {
    planetImage.src = selected.images?.png || selected.image;
    planetImage.alt = selected.name;
    planetTitle.textContent = selected.name;
    planetDescription.textContent = selected.description;
    planetDistance.textContent = selected.distance;
    planetTravel.textContent = selected.travel;
}

function initCrew() {
    const crewList = myData.crew;

    if (!crewList || crewList.length === 0) return;

    updateCrewInfo(crewList[0]);

    crewButtons.forEach((button) => {
        button.addEventListener('click', (e) => {

            crewButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active')


            let index = e.target.getAttribute('data-index');
            let selected = crewList[index];

            const elementsToAnimate = [
                crewImage,
                crewTitle,
                crewDescription,
                crewTag
            ];


            elementsToAnimate.forEach(el => {
                if (el) el.classList.add('fade-out');
            });


            setTimeout(() => {
                updateCrewInfo(selected);
                elementsToAnimate.forEach(el => {
                    if (el) el.classList.remove('fade-out');
                });
            }, 300);

        });
    });
}

function updateCrewInfo(selected) {
    if (!selected) return;

    if (crewImage) {
        crewImage.src = selected.images?.png || selected.images?.webp || selected.image;
        crewImage.alt = selected.name;
    }
    if (crewTitle) crewTitle.textContent = selected.name;
    if (crewDescription) crewDescription.textContent = selected.bio;
    if (crewTag) crewTag.textContent = selected.role;
}

function initTech() {
    if (!techButtons || techButtons.length === 0) return;

    const technologyList = myData.technology;
    if (!technologyList || technologyList.length === 0) return;

    updateTechInfo(technologyList[0]);

    techButtons.forEach((button) => {
        button.addEventListener('click', (e) => {

            techButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            let index = e.target.getAttribute('data-index');
            let selected = technologyList[index];

            const elementsToAnimate = [
                techImage,
                techTitle,
                techDescription
            ];

            elementsToAnimate.forEach(el => {
                if (el) el.classList.add('fade-out');
            });

            setTimeout(() => {
                updateTechInfo(selected);
                elementsToAnimate.forEach(el => {
                    if (el) el.classList.remove('fade-out');
                });
            }, 300);

        });
    });

    window.addEventListener('resize', () => {
        let activeBtn = document.querySelector('.tech-btn.active');
        let index = activeBtn ? activeBtn.getAttribute('data-index') : 0;
        if (technologyList[index]) {
            setImageByScreenSize(technologyList[index]);
        }
    });
}

function updateTechInfo(selected) {
    if (!selected) return;

    // تحديث النصوص
    if (techTitle) techTitle.textContent = selected.name;
    if (techDescription) techDescription.textContent = selected.description;

    setImageByScreenSize(selected);
}

function setImageByScreenSize(selected) {
    if (!techImage || !selected.images) return;

    if (window.innerWidth < 992) {
        techImage.src = selected.images.landscape;
    } else {
        techImage.src = selected.images.portrait;
    }

    techImage.alt = selected.name;
}

if (exploreBtn && exploreToast) {
  exploreBtn.addEventListener('click', () => {
    exploreToast.classList.remove('d-none');
  });

  closeToastBtn.addEventListener('click', () => {
    exploreToast.classList.add('d-none');
  });
}