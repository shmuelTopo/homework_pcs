import {Address, Person} from '../models/person'

export const addresses: Address[] = [
    {
        streetName: 'Rabbi Arkiva',
        streetNumber: 4,
        city: 'Modiin Ilit',
        state: 'Israel',
        country: 'Israel',
        zipCode: '32233209'
    },
    {
        streetName: 'Arlington Ave',
        streetNumber: 530,
        city: 'Lakewood',
        state: 'NJ',
        country: 'USA',
        zipCode: '08701'
    },
    {
        streetName: 'Golders Green Road',
        streetNumber: 150,
        city: 'Lakewood',
        state: 'NJ',
        country: 'USA',
        zipCode: '08701'
    }
]

export const people: Person[] = [
    {
        firstName: 'Shmuel',
        lastName: 'Toporowitch',
        age: 22,
        email: 'shmuelTops@gmail.com',
        address: addresses[0]
    },
    {
        firstName: 'Esti',
        lastName: 'Toporowitch',
        age: 23,
        email: 'estiTops@gmail.com',
        address: addresses[0]
    },
    {
        firstName: 'Abba',
        lastName: 'Toporowitch',
        email: 'abbaTops@gmail.com',
        age: 42,
        address: addresses[1]
    },

    {
        firstName: 'Ema',
        lastName: 'Toporowitch',
        email: 'emaToporowitch@gmail.com',
        age: 42,
        address: addresses[1]
    },
    {
        firstName: 'Yechiel',
        lastName: 'Toporowitch',
        email: 'yechielTheKing@gmail.com',
        age: 20,
        address: addresses[1]
    },
    {
        firstName: 'Moriya',
        lastName: 'Toporowitch',
        email: 'chayaT@gmail.com',
        age: 18,
        address: addresses[1]
    },
    {
        firstName: 'Mali',
        lastName: 'Toporowitch',
        email: 'MalkaCutie@gmail.com',
        age: 16,
        address: addresses[1]
    },
    {
        firstName: 'Ezriel',
        lastName: 'Blum',
        email: 'frenchieEzriel@gmail.com',
        age: 24,
        address: addresses[2]
    },
    {
        firstName: 'Rachel',
        lastName: 'Blum',
        age: 20,
        email: 'rachelushs@gmail.com',
        address: addresses[2]
    },

];