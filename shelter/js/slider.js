let allPets = [];
let currentPets = [];
document.addEventListener('DOMContentLoaded', function() {
    let track = document.querySelector('.slider__cards');
    let prevBtn = document.querySelector('.slider__arrow-left');
    let nextBtn = document.querySelector('.slider__arrow-right');

    let isAnimating = false;

    function loadPets() {
        fetch('pets.json')
            .then(response => response.json())
            .then(data => {
                allPets = data.map((pet, index) => ({
                    ...pet,
                    id: index + 1
                }));
                console.log('Pets loaded!',allPets);
                initSlider();
            })
            .catch(error => {
                console.error('Error', error);

            });
    }
    loadPets();

    function getCardsPerView() {
        let width = window.innerWidth;
        if (width < 768) return 1;
        if (width < 1280) return 2;
        if (width >= 1280) return 3;
    }

    function initSlider() {
        let countCards = getCardsPerView();
        console.log('View', countCards);

        let firstGroup = allPets.slice(0, countCards);
        currentPets = firstGroup;
        renderCards(firstGroup);
    }

    function createPetCard(pet) {
        let sliderCard = document.createElement('div');
        sliderCard.classList.add('slider__card');
        sliderCard.dataset.id = pet.id;

        let img = document.createElement('img');
        img.className = 'card__image';
        img.src =`./images/pets-${pet.name.toLowerCase()}.png`;
        img.alt = `Pet ${pet.name}`;

        let title = document.createElement('h4');
        title.className = 'card__title';
        title.textContent = pet.name;

        let btn = document.createElement('button');
        btn.className = 'card__btn';
        btn.textContent = 'Learn more';

        sliderCard.append(img, title, btn);

        sliderCard.addEventListener('click', function() {
            if (window.openModal) {
                window.openModal(pet.id);
            }
        });

        return sliderCard;
    }

    function renderCards(pets) {
        track.style.opacity = '0';
        track.style.transform = 'translateX(3rem)';

        setTimeout(()=> {
            track.innerHTML = '';
            pets.forEach(pet => {
                let petCard = createPetCard(pet);
                track.append(petCard);
            });

        track.style.opacity = '1';
        track.style.transform = 'translateX(0)';

        },300)
    }

    function shuffleArray(array) {
        let arr = [...array];
        for (let i = arr.length-1; i>0; i--) {
            let j = Math.floor(Math.random()*(i+1));
            let temp = arr[i];
            arr[i]= arr[j];
            arr[j] = temp;
        }
        return arr;
    }

    function getNextGroup(currentGroup) {
        let availablePets = allPets.filter(pet => {
            return !currentGroup.some(p => p.id == pet.id);
        });
        let shuffled = shuffleArray(availablePets);
        let count = currentGroup.length;
        let newGroup = shuffled.slice(0, count);

        return newGroup;
    }

    nextBtn.addEventListener('click', function() {
        if (isAnimating) return;
        isAnimating = true;
        let newGroup = getNextGroup(currentPets);
        currentPets = newGroup;
        renderCards(newGroup);

        setTimeout(() => {
            isAnimating = false;
        }, 500);
    });

    prevBtn.addEventListener('click', function() {
        if (isAnimating) return;
        isAnimating = true;
        let newGroup = getNextGroup(currentPets);
        currentPets = newGroup;
        renderCards(newGroup);

        setTimeout(() => {
            isAnimating = false;
        }, 500);
    });

    window.addEventListener('resize', function() {
    let newCount = getCardsPerView();
    let currentCount = currentPets.length;

    if (newCount !== currentCount) {
        let firstGroup = allPets.slice(0, newCount);
        currentPets = firstGroup;
        renderCards(firstGroup);
    }
});

});