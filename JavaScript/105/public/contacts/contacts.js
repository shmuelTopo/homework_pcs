(function () {
  'use strict';

  const contactTable = get('contactsTable');
  const addContactForm = get('addContactForm');
  const randomPerson = get('addRandom');

  const firstNameInput = get('first');
  const lastNameInput = get('last');
  const emailInput = get('email');
  const phoneInput = get('phone');

  let contacts = [];

  async function getContacts() {
    const response = await fetch('/api/contacts');
    const data = await response.json();
    contacts = data;
    data.forEach((contact) => {
      addContactToTable(contact);
    });
  }
  getContacts();

  const garbageHtml = `<svg width="22" height="22" fill="currentColor" viewBox="0 0 16 16">< path d = "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" /><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" /></svg >`;
  const penHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>`;

  function get(id) {
    return document.getElementById(id);
  }

  get('addContact').addEventListener('click', () => {
    //Show the hidden form to add new contact
    addContactForm.style.display = 'block';
  });

  function addContactToTable(contact) {
    console.log(contactTable.rows[1]);
    if (contactTable.rows[1].id === 'contactsEmpty') {
      contactTable.deleteRow(1);
    }

    const tabelBody = contactTable.getElementsByTagName('tbody')[0];
    const row = tabelBody.insertRow();
    row.className = 'contactsGrid';

    const firstNameCell = row.insertCell();
    const lastNameCell = row.insertCell();
    const emailCell = row.insertCell();
    const phoneCell = row.insertCell();
    const deleteCell = row.insertCell();
    deleteCell.classList.add('btnContainer');

    firstNameCell.innerHTML = `<div class="scroll">${contact.first}<div>`;
    lastNameCell.innerHTML = `<div class="scroll">${contact.last}<div>`;
    emailCell.innerHTML = `<div class="scroll">${contact.email}<div>`;
    phoneCell.innerHTML = `<div class="scroll">${contact.phone}<div>`;

    const delteButton = document.createElement('button');
    delteButton.innerHTML = garbageHtml;

    const editButton = document.createElement('button');
    editButton.innerHTML = penHtml;

    delteButton.addEventListener('click', async () => {
      const response = await fetch(`/api/delete/${contact.id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        contacts.splice(row.rowIndex - 1, 1);
        contactTable.deleteRow(row.rowIndex);
        if (contacts.length === 0) {
          const row = tabelBody.insertRow();
          const cell = row.insertCell();
          row.id = 'contactsEmpty';
          cell.innerText = 'no contacts loaded';
          cell.setAttribute('colspan', '5');
        }
      } else {
        alert('Error deleting contact');
      }
    });

    editButton.addEventListener('click', () => {
      //Show the hidden form to edit contact
      addContactForm.style.display = 'block';
      //Fill the form with the current contact data
      firstNameInput.value = contact.first;
      lastNameInput.value = contact.last;
      emailInput.value = contact.email;
      phoneInput.value = contact.phone;
      //Set the id of the contact to be edited
      addContactForm.setAttribute('data-id', contact.id);
    });

    deleteCell.appendChild(delteButton);
    deleteCell.appendChild(editButton);
  }

  addContactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    let fetchUrl;
    let method;

    console.log(addContactForm.getAttribute('data-id'));
    if (addContactForm.getAttribute('data-id')) {
      fetchUrl = `/api/edit/${addContactForm.getAttribute('data-id')}`;
      method = 'PUT';
    } else {
      fetchUrl = '/api/add-contact';
      method = 'POST';
      addContactForm.removeAttribute('data-id');
    }
    console.log(fetchUrl, method);
    const response = await fetch(fetchUrl, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first: firstNameInput.value,
        last: lastNameInput.value,
        email: emailInput.value,
        phone: phoneInput.value
      })
    });
    const data = await response.json();

    if (response.ok) {
      if (method === 'POST') {
        contacts.push(data);
        addContactToTable(data);
      } else {
        contacts.find((contact, index) => {
          console.log(contact.id, Number(data.id));
          if (contact.id === Number(data.id)) {
            
            contacts[index] = data;
            //Update the row
            const row = contactTable.rows[index + 1];
            row.cells[0].innerHTML = `<div class="scroll">${data.first}<div>`;
            row.cells[1].innerHTML = `<div class="scroll">${data.last}<div>`;
            row.cells[2].innerHTML = `<div class="scroll">${data.email}<div>`;
            row.cells[3].innerHTML = `<div class="scroll">${data.phone}<div>`;
            return true;
          }
        });
      }
    } else {
      alert(data.message);
    }
    hideAndResetAddContactForm();
    console.log(contacts);
  });

  randomPerson.addEventListener('click', async () => {
    const response = await fetch('/api/add/random');
    const contact = await response.json();

    if (response.status === 201) {
      contacts.push(contact);
      addContactToTable(contact);
    } else {
      alert('Error adding random contact. Please try again later.');
    }
    console.log(contacts);
  });

  get('cancel').addEventListener('click', () => {
    hideAndResetAddContactForm();
  });

  function hideAndResetAddContactForm() {
    addContactForm.reset();
    addContactForm.style.display = 'none';
  }
})();
