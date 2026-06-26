document.addEventListener('DOMContentLoaded', function() {

    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    let allPets = [];


    function loadPets() {
        fetch('pets.json')
            .then(response => response.json())
            .then(data => {
                allPets = data.map((pet, index) => ({
                    ...pet,
                    id: index + 1
                }));
            })
            .catch(error => {
                console.error('Error', error);

            });
    }

    function openModal(petId) {
        let pet = allPets.find(p => p.id === petId);
        if (!pet) return;

        modalBody.innerHTML = `
            <div class="modal-pet">
                <div class="modal-pet-image">
                    <img src="./images/pets-${pet.name.toLowerCase()}.png" alt="${pet.name}">
                </div>
                <div class="modal-pet-info">
                    <h3>${pet.name}</h3>
                    <p class="pet-type">${pet.type} - ${pet.breed}</p>
                    <p class="pet-description">${pet.description}</p>
                    <ul class="modal-details">
                        <li class="modal-details__item">
                            <span class="modal-details__label">Age:</span>
                            <span class="modal-details__value">${pet.age}</span>
                        </li>
                        <li class="modal-details__item">
                            <span class="modal-details__label">Inoculations:</span>
                            <span class="modal-details__value">${pet.inoculations.join(', ')}</span>
                        </li>
                        <li class="modal-details__item">
                            <span class="modal-details__label">Diseases:</span>
                            <span class="modal-details__value">${pet.diseases.join(', ')}</span>
                        </li>
                        <li class="modal-details__item">
                            <span class="modal-details__label">Parasites:</span>
                            <span class="modal-details__value">${pet.parasites.join(', ')}</span>
                        </li>
                    </ul>
                </div>
            </div>
        `;

        modal.classList.add('active');
        document.body.classList.add('no-scroll');
    }


    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    loadPets();

    window.openModal = openModal;
});