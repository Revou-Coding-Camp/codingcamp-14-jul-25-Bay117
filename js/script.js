document.addEventListener('DOMContentLoaded', () => {
    const userNameSpan = document.getElementById('user-name');
    const messageForm = document.getElementById('message-form');
    const submittedInfoDiv = document.getElementById('submitted-info');
    const currentTimeSpan = document.getElementById('current-time');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const menuButton = document.getElementById('menu-button');
    const navbarLinks = document.getElementById('navbar-links');
    const enteredName = prompt("Silakan masukkan nama Anda:");
    const welcomeHeading = userNameSpan.parentElement;

    if (enteredName && enteredName.trim() !== "") {
        welcomeHeading.innerHTML = `Hai ${enteredName.trim()}, Selamat Datang di Website`;
    } else {
        welcomeHeading.innerHTML = `Hai, Selamat Datang di Website`;
    }

    function updateCurrentTime() {
        const now = new Date();
        const options = {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            timeZoneName: 'short'
        };
        currentTimeSpan.textContent = now.toLocaleDateString('id-ID', options);
    }
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000); 

    function showSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.remove('section-hidden');
            } else {
                section.classList.add('section-hidden');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); 
            const targetSection = event.target.dataset.section;
            if (targetSection === 'home') {
                showSection('home-section');
            } else if (targetSection === 'profile') {
                showSection('profile-section');
            } else if (targetSection === 'message-us') {
                showSection('message-us-section');
            }
            if (navbarLinks.classList.contains('active')) {
                navbarLinks.classList.remove('active');
            }
        });
    });

    showSection('home-section');

    menuButton.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const nameInput = document.getElementById('name');
        const dobInput = document.getElementById('dob');
        const genderInputs = document.querySelectorAll('input[name="gender"]');
        const messageInput = document.getElementById('message');

        let isValid = true;
        let errorMessage = [];

        if (nameInput.value.trim() === '') {
            isValid = false;
            errorMessage.push('Nama wajib diisi.');
        }
        if (dobInput.value.trim() === '') {
            isValid = false;
            errorMessage.push('Tanggal Lahir wajib diisi.');
        }
        let selectedGender = null;
        genderInputs.forEach(radio => {
            if (radio.checked) {
                selectedGender = radio.value;
            }
        });
        if (!selectedGender) {
            isValid = false;
            errorMessage.push('Jenis Kelamin wajib diisi.');
        }
        if (messageInput.value.trim() === '') {
            isValid = false;
            errorMessage.push('Pesan wajib diisi.');
        }

        if (!isValid) {
            submittedInfoDiv.innerHTML = `<p class="text-red-500 font-semibold">Mohon koreksi kesalahan berikut:</p><ul class="list-disc list-inside text-red-500">${errorMessage.map(msg => `<li>${msg}</li>`).join('')}</ul>`;
            return;
        }

        submittedInfoDiv.innerHTML = `
            <p><strong>Nama:</strong> ${nameInput.value}</p>
            <p><strong>Tanggal Lahir:</strong> ${dobInput.value}</p>
            <p><strong>Jenis Kelamin:</strong> ${selectedGender}</p>
            <p><strong>Pesan:</strong> ${messageInput.value}</p>
        `;
        messageForm.reset();
    });
});