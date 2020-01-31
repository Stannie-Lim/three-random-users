const randomPerson1 = fetch("https://acme-users-api-rev.herokuapp.com/api/users/random")
                        .then(response => response.json());
const randomPerson2 = fetch("https://acme-users-api-rev.herokuapp.com/api/users/random")
                        .then(response => response.json());
const randomPerson3 = fetch("https://acme-users-api-rev.herokuapp.com/api/users/random")
                        .then(response => response.json());


const showUsers = document.querySelector(".showUsers");
const showAll = document.querySelector(".random");

const usersArray = [];
const getRandomUsers = Promise.all([randomPerson1, randomPerson2, randomPerson3])
    .then(response => {
        renderUsers(response);
    })
    .catch(err => {
        console.log(err);
    });

const renderPage = (click) => {
    click.forEach(person => {
        person.addEventListener("click", (ev) => {
            ev.target.parentElement.childNodes[3].classList.toggle("hide");
        });
    });
};

const renderUsers = (listOfPeople) => {
    for(let i = 0; i < listOfPeople.length; i++) {
        usersArray.push({
            name: listOfPeople[i].fullName,
            email: listOfPeople[i].email,
            picture: listOfPeople[i].avatar,
            number: i
        });
    }
    const html = usersArray.map(person => {
        return `
            <ul>
                <li class="show">${person.number + 1}</li>
                <li class="box">
                    <h2>${person.name}</h2>
                    <p>${person.email}</p>
                    <img class="avatar" src=${person.picture}></img>
                </li>
            </ul>
        `;
    }).join('');
    showUsers.innerHTML = html;
    const show = document.querySelectorAll(".show");
    renderPage(show);

    const showAllPeople = document.querySelectorAll(".box");
    // console.log(showAllPeople);
    showAllPeople.forEach(person => {
        showAll.addEventListener("click", () => {
            person.classList.remove("hide");
        });
    });
};




/*
    <li>
        <h2>Zoe Bins</h2>
        <p>zoe@sadas.da.com</p>
    </li>
    <li>
        <h2>Zoe Bins</h2>
        <p>zoe@sadas.da.com</p>
    </li>
    <li>
        <h2>Zoe Bins</h2>
        <p>zoe@sadas.da.com</p>
    </li>
*/