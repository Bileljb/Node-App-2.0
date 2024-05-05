const container = document.querySelector('.container');

fetch('/users.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(el => {
            const card = document.createElement('div');
            card.classList = "card";

            const img = document.createElement('img');
            img.classList = 'round';
            if (el.gender === 'male') {
                img.src = '/images/boy.jpg';
            } else {
                img.src = '/images/images.jpg';
            }

            const fName = document.createElement('h4');
            fName.classList = 'c-name';
            fName.textContent = el.name;

            const country = document.createElement('h5');
            country.classList = 'country';
            country.textContent = el.country;

            const profession = document.createElement('p');
            profession.classList = 'prof';
            profession.textContent = el.profession;

            const Btns = document.createElement('div');
            Btns.classList = 'buttons';

            const mainBtn = document.createElement('button');
            mainBtn.classList = 'main-btn';
            mainBtn.textContent = 'Contact Me';

            const secondaryBtn = document.createElement('button');
            secondaryBtn.classList = 'main-btn secondary';
            secondaryBtn.textContent = 'Follow Me';

            Btns.appendChild(mainBtn);
            Btns.appendChild(secondaryBtn);

            const skills = document.createElement('div');
            skills.classList = 'skills';

            const h5 = document.createElement('h5');
            h5.classList = 'skill';
            h5.textContent = 'Skills';

            const ul = document.createElement('ul');

            el.skills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill;
                ul.appendChild(li);
            });

            skills.appendChild(h5);
            skills.appendChild(ul);

            card.appendChild(img);
            card.appendChild(fName);
            card.appendChild(country);
            card.appendChild(profession);
            card.appendChild(Btns);
            card.appendChild(skills);

            container.appendChild(card);
        });
    })
    .catch(error => console.error('Error fetching data:', error));


const searchBtn = document.querySelector('.btn-outline-success')
const searchInput = document.querySelector('.form-control')

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const cards = document.querySelectorAll('.card')
    const searchedValue = searchInput.value.toLowerCase();

    cards.forEach(card => {
        const skills = card.querySelector('.skills').textContent.toLowerCase();
        if (skills.includes(searchedValue)) {
            card.style.display = 'block'; 
        } else {
            card.style.display = 'none'; 
        }
    });
});
