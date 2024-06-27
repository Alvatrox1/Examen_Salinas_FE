
const createNumcontrol = () => {
    let date = Date.now();
    let num = Math.floor(Math.random() * 300);
    date = date.toString().slice(0,5);
    let numControl = '000' + date + num;

    return numControl;

  }

  const ErrorTypes = {
    saveError : 'saveError',
    editError : 'editError',
    deleteError : 'deleteError'
  }

  export {
    createNumcontrol,
    ErrorTypes
  }
