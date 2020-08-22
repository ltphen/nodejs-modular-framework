class StringAPI {
    constructor() {
      this.a = 0
    }

    /**
    * @params string String the string to capitalize
    */
    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
    * @params string String the string to capitalize
    */
    generateCode() {
        const today = new Date();

        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yy = String(today.getFullYear()).slice(2,4);
        const ss = today.getSeconds();
        const m = String(today.getMinutes()).padStart(2, '0');
        const h = String(today.getHours()).padStart(2, '0');
        const code = ss+m+h+dd+mm+yy+this.generateString(2);
        return (code);
    }

    generatePassword() {
        const today = new Date();

        const dd = String(today.getDate()).padStart(2, '0');
        const ss = today.getSeconds();
        const m = String(today.getMinutes()).padStart(2, '0');
        const h = String(today.getHours()).padStart(2, '0');
        const code = ss+m+h+dd+this.generateString(4);
        return this.shuffle(code);
    }

    shuffle(sentence) {
        const a = sentence.split("");
        const n = a.length;

        for(let i = n - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a.join("");
    }

    generateString(length) {
        let result           = '';
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
}

export default new StringAPI();