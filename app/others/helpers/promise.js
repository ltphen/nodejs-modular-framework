class Promise {
    constructor() {
        this._resolve = null;
        this._reject = null;

    }

    resolve(argument) {
        this._resolve = argument;
    }

    reject(argument) {
        this._reject = argument;
    }

    promise() {
        return new Promise(function(resolve, reject){
            if (this.resolve != null) {
                resolve(this.resolve);
            }else{
                reject(this.reject);
            }
        });
    }
}

export default Promise;