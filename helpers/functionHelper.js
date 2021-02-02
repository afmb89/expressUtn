module.exports={
    General:{
        campo_obligatorio:"El campo {PATH} es obligatorio",
        minlegth:"El campo {PATH} tiene al menos {VALUE}",
        maxlength:"El campo {PATH} tiene como máximo {VALUE}"
    },
    userWeb:{
        userExist:"auth/email-already-in-use",
        passwordIncorrect:"auth/weak-password",
        userNoExist:"auth/user-not-found",
        userOK:"Login successful",
        passwordInvalid:"auth/wrong-password"
    },
    messageError: function (code){
        let mensaje = '';

        switch(code) {
            case 'auth/weak-password':
                mensaje = 'La contraseña tiene que tener al menos 6 dígitos!!!';
                break;
            case 'auth/email-already-in-use':
                mensaje = 'El email ya existe!!!';
                break;
            case 'auth/user-not-found':
                mensaje ='Usuario no encontrado!!!';
                break;
            case 'auth/wrong-password':
                mensaje ='La contraseña no es correcta!!!';
                break;
            default:
                mensaje = code;
                break;
        }

    return mensaje;
    }
}