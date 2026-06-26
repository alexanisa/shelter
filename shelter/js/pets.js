document.addEventListener('DOMContentLoaded', function() {
    const table = document.querySelector('.our-friends__cards.pets');
    const pagination = document.querySelector('.our-friend__pagination');

    let allPets = [];
    let allCards = [];
    let currentPage = 1;
    let cardsPerPage = 8;
    let totalPages = 6;

    function loadPets() {
        fetch('pets.json')
            .then(response => response.json())
            .then(data => {
                allPets = data.map((pet, index) => ({
                    ...pet,
                    id: index + 1
                }));
                console.log('Pets loaded!',allPets);
                generateCards();
            })
            .catch(error => {
                console.error('Error', error);

            });
    }

    function getCardsPerPage() {
        let width = window.innerWidth;
        if (width >= 1280) return 8;
        if (width >= 768) return 6;
        if (width < 768) return 3;
    }

    function generateCards() {
        let result = [];

        for(let i=0; i<6;i++) {
            allPets.forEach(pet=> {
                result.push(pet);
            });
        }

        let hasDuplicates = true;

        while(hasDuplicates) {
            result = shuffleArray(result);
            hasDuplicates = false;

            for(let i=0; i<result.length-1; i++) {
                if (result[i].id===result[i+1].id) {
                    hasDuplicates = true;
                    break;
                }
            }
        }

        allCards = result;
        initPagination();
    }

    function createPetCard(pet) {
        let petCard = document.createElement('div');
        petCard.classList.add('our-friends__card');
        petCard.dataset.id = pet.id;

        let img = document.createElement('img');
        img.className = 'card__image';
        img.src =`./images/pets-${pet.name.toLowerCase()}.png`;
        img.alt = `Pet ${pet.name}`;

        let title = document.createElement('h2');
        title.className = 'card__title';
        title.textContent = pet.name;

        let btn = document.createElement('button');
        btn.className = 'card__btn';
        btn.textContent = 'Learn more';

        petCard.append(img, title, btn);

        petCard.addEventListener('click', function() {
            if (window.openModal) {
                window.openModal(pet.id);
            }
        });

        return petCard;
    }

    function renderPage(page) {
        table.style.opacity = '0';
        table.style.transform = 'translateY(2rem)';

        setTimeout(()=> {
            table.innerHTML = '';
            let start = (page - 1) * cardsPerPage;
            let end = start + cardsPerPage;

            let pageCards = allCards.slice(start,end);

            pageCards.forEach(pet=> {
                let card = createPetCard(pet);
                table.append(card);
            });

        table.style.opacity = '1';
        table.style.transform = 'translateY(0)';
        },300);
    }

    function renderPagination() {
        pagination.innerHTML = '';
        let firstBtn = document.createElement('button');
        firstBtn.className = 'pagination__btn pagination__btn--start';
        firstBtn.innerHTML = '&lt;&lt;';
        if (currentPage ===1) firstBtn.disabled = true;
        firstBtn.addEventListener('click', ()=> goToPage(1));
        pagination.append(firstBtn);

        let prevBtn = document.createElement('button');
        prevBtn.className = 'pagination__btn pagination__btn--prev';
        prevBtn.innerHTML = '&lt;';
        if (currentPage === 1) prevBtn.disabled = true;
        prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
        pagination.append(prevBtn);

        let currentBtn = document.createElement('button');
        currentBtn.className = 'pagination__btn pagination__btn--active';
        currentBtn.textContent = currentPage;
        pagination.append(currentBtn);

        let nextBtn = document.createElement('button');
        nextBtn.className = 'pagination__btn pagination__btn--next';
        nextBtn.innerHTML = '&gt;';
        if (currentPage === totalPages) nextBtn.disabled = true;
        nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
        pagination.append(nextBtn);

        let lastBtn = document.createElement('button');
        lastBtn.className = 'pagination__btn pagination__btn--end';
        lastBtn.innerHTML = '&gt;&gt;';
        if (currentPage === totalPages) lastBtn.disabled = true;
        lastBtn.addEventListener('click', () => goToPage(totalPages));
        pagination.append(lastBtn);
    }

    function goToPage(page) {
        if (page <1 || page >totalPages) return;
        currentPage = page;
        renderPage(currentPage);
        renderPagination();
    }

    function initPagination() {
        cardsPerPage = getCardsPerPage();
        totalPages = Math.ceil(allCards.length / cardsPerPage);
        currentPage = 1;
        renderPage(currentPage);
        renderPagination();
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

    window.addEventListener('resize', function () {
        let newCardsPerPage = getCardsPerPage();
        if( newCardsPerPage !== cardsPerPage) {
            cardsPerPage = newCardsPerPage;
            totalPages = Math.ceil(allCards.length / cardsPerPage);
            if (currentPage > totalPages) currentPage = totalPages;
            renderPage(currentPage);
            renderPagination();
        }
    })

    loadPets();

});