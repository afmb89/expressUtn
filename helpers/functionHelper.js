module.exports = function messageError(code) {
    let mensaje = '';
    switch(code) {
        case 'jwt must be provided':
            mensaje = 'No hay Token en el sistema';
            break;
        case 'auth/email-already-in-use':
            mensaje = 'El email ya existe!!!';
            break;
        case 'invalid signature':
            mensaje = 'El Token no existe';
            break;
        case 'auth/weak-password':
            mensaje = 'La contraseña tiene que tener al menos 6 dígitos!!!';
            break;
        case 'auth/user-not-found':
            mensaje ='Email no encontrado!!!';
            break;
        case 'auth/wrong-password':
            mensaje ='La contraseña no es correcta!!!';
            break;
        default:
            mensaje = code;
            break;
    }
}

module.exports={
    General:{
        campo_obligatorio:"El campo {PATH} es obligatorio",
        minlegth:"El campo {PATH} tiene al menos {VALUE}",
        maxlength:"El campo {PATH} tiene como máximo {VALUE}"
    },
    userWeb:{
        userExist:"El {VALUE} ya existe",
        passwordIncorrect:"El {PATH} debe contener al menos 1 letra, 1 minúscula, 1 mayúscula",
        userNoExist:"El {VALUE} no existe",
        userOK:"Login OK",
        passwordInvalid:"{PATH} inválida"
    }    
}