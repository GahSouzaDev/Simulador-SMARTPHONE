// Funções específicas do calendário
let nav = 0;
let clicked = null;
let events = getEventsCookie(); // Obtém eventos dos cookies

// variáveis do modal
const newEvent = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');

// variáveis do calendário
const calendar = document.getElementById('calendar');
const weekdays = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

// feriados
const holidays = {
    0: [1], // Janeiro
    1: [12, 13, 14], // Fevereiro
    2: [29], // Março
    3: [21], // Abril
    4: [1, 30], // Maio
    5: [], // Junho
    6: [9], // Julho
    7: [], // Agosto
    8: [7], // Setembro
    9: [12], // Outubro
    10: [2, 15, 20], // Novembro
    11: [25] // Dezembro
};

// funções
function openModal(date) {
    clicked = date;
    const eventDay = events.find((event) => event.date === clicked);

    if (eventDay) {
        document.getElementById('eventText').innerText = eventDay.title;
        deleteEventModal.style.display = 'block';
    } else {
        newEvent.style.display = 'block';
    }

    backDrop.style.display = 'block';
}

function load() {
    const date = new Date();

    // mudar título do mês
    if (nav !== 0) {
        date.setMonth(new Date().getMonth() + nav);
    }

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const daysMonth = new Date(year, month + 1, 0).getDate();
    const firstDayMonth = new Date(year, month, 1);
    const dateString = firstDayMonth.toLocaleDateString('pt-br', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    const paddinDays = weekdays.indexOf(dateString.split(', ')[0]);

    // mostrar mês e ano
    document.getElementById('monthDisplay').innerText = `${date.toLocaleDateString('pt-br', { month: 'long' })}, ${year}`;

    calendar.innerHTML = '';

    // criar uma div com os dias
    for (let i = 1; i <= paddinDays + daysMonth; i++) {
        const dayS = document.createElement('div');
        dayS.classList.add('day');

        const dayString = `${month + 1}/${i - paddinDays}/${year}`;

        // condicional para criar os dias de um mês
        if (i > paddinDays) {
            const dayNumber = i - paddinDays;
            dayS.innerText = dayNumber;

            // verifica se é um feriado
            if (holidays[month] && holidays[month].includes(dayNumber)) {
                dayS.classList.add('holiday');
            }

            const eventDay = events.find(event => event.date === dayString);

            if (dayNumber === day && nav === 0) {
                dayS.id = 'currentDay';
            }

            if (eventDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventDay.title;
                dayS.appendChild(eventDiv);
            }

            dayS.addEventListener('click', () => openModal(dayString));
        } else {
            dayS.classList.add('padding');
        }

        calendar.appendChild(dayS);
    }
}

function closeModal() {
    eventTitleInput.classList.remove('error');
    newEvent.style.display = 'none';
    backDrop.style.display = 'none';
    deleteEventModal.style.display = 'none';

    eventTitleInput.value = '';
    clicked = null;
    load();
}

function saveEvent() {
    if (eventTitleInput.value) {
        eventTitleInput.classList.remove('error');

        events.push({
            date: clicked,
            title: eventTitleInput.value
        });

        setEventsCookie(events); // Salva eventos no cookie
        closeModal();
    } else {
        eventTitleInput.classList.add('error');
    }
}

function deleteEvent() {
    events = events.filter(event => event.date !== clicked);
    setEventsCookie(events); // Salva eventos no cookie
    closeModal();
}

// botões
function buttons() {
    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('saveButton').addEventListener('click', () => saveEvent());

    document.getElementById('cancelButton').addEventListener('click', () => closeModal());

    document.getElementById('deleteButton').addEventListener('click', () => deleteEvent());

    document.getElementById('closeButton').addEventListener('click', () => closeModal());
}
buttons();
load();
