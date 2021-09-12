(function() {
    'use strict';

    const contactTable = get('contactsTable');
    const addContactForm = get('addContactForm');
    const randomPerson = get('addRandom');
    
    const firstNameInput = get('first');
    const lastNameInput = get('last');
    const emailInput = get('email');
    const phoneInput = get('phone');
    
    const contacts = [];

    const garbageHtml = `<svg width="22" height="22" fill="currentColor" viewBox="0 0 16 16">< path d = "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" /><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" /></svg >`;
    
    
    function get(id) {
        return document.getElementById(id);
    }
    
    get('addContact').addEventListener('click', () => {
        //Show the hidden form to add new contact
        addContactForm.style.display = 'block';
    });

    function addContact(first, last, email, phone){
        if (!contacts.length) {
            // If there is no contacts yet, delete the first row
            contactTable.deleteRow(1);
        }

        const newContact = {
            first: first,
            last: last,
            email: email,
            phone: phone
        };

    
        contacts.push(newContact);

        const tabelBody = contactTable.getElementsByTagName('tbody')[0];
        const row = tabelBody.insertRow();
        row.className = 'contactsGrid';

        const firstNameCell = row.insertCell();
        const lastNameCell = row.insertCell();
        const emailCell = row.insertCell();
        const phoneCell = row.insertCell();
        const deleteCell = row.insertCell();

        firstNameCell.innerHTML = `<div class="scroll">${newContact.first}<div>`;
        lastNameCell.innerHTML = `<div class="scroll">${newContact.last}<div>`;
        emailCell.innerHTML = `<div class="scroll">${newContact.email}<div>`;
        phoneCell.innerHTML = `<div class="scroll">${newContact.phone}<div>`;


        const myNewButton = document.createElement('button');
        myNewButton.innerHTML = garbageHtml;
        myNewButton.classList.add('center');

        myNewButton.addEventListener('click', () => {
            contacts.splice(row.rowIndex - 1, 1);
            contactTable.deleteRow(row.rowIndex);
            if(contacts.length === 0){
                const row = tabelBody.insertRow();
                const cell = row.insertCell();
                cell.innerText = 'no contacts loaded';
                cell.setAttribute("colspan", "5");
            }
        });
        deleteCell.appendChild(myNewButton);
    }

    addContactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addContact(firstNameInput.value, lastNameInput.value, emailInput.value, phoneInput.value);
        hideAndResetAddContactForm();
    });

    randomPerson.addEventListener('click', () => {
        let newContact = window.contactList.utils.getRandomPerson();
        addContact(newContact[0], newContact[1], newContact[2], newContact[3]);
    });

    get('cancel').addEventListener('click', () => {
        hideAndResetAddContactForm();
    });

    function hideAndResetAddContactForm() {
        addContactForm.reset();
        addContactForm.style.display = 'none';
    }

})();