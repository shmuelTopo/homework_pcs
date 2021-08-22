(function (){
    'use strict';

    function performTransaction2(amount){
        this.balance += amount;
        console.log(`Depositing $${amount} to ${this.name}\'s account, new balance: $${this.balance}`);
    }

    function createBankAccount(nameAccountHolder){
        return {
            name: nameAccountHolder,
            balance: 0,
            performTransaction: function (amount){
                this.balance += amount;
                console.log(`Depositing $${amount} to ${this.name}\'s account, new balance: $${this.balance}`);
            }
        };
    }

    let joeBidenAccount = createBankAccount('Joe Biden');
    joeBidenAccount.performTransaction(100);
    performTransaction2.call(joeBidenAccount, -22);

    let kamilaAccount = createBankAccount('Kamila Harris');
    kamilaAccount.performTransaction(89);
    performTransaction2.call(kamilaAccount, -35);

})();