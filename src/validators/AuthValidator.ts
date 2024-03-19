
interface User {
username?: string
email?: string
password?: string | string[]

}
export const registreValidator = async (username :string , email :string, password :string, ConfirmPassword :string ) => {

const validatorEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const validatorPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


const errors : User= {}

if (!username) {
errors.username = "Nome de usuário não enviado"
} 

if (!validatorEmail.test(email)) {
errors.email = "Email inválido"
}

if (password !== ConfirmPassword) {
errors.password = "Senha e confirmação de senha diferentes"
} else if (!validatorPassword.test(password)) {
errors.password = [
"A senha deve conter pelo menos um caractere minúsculo.",
"A senha deve conter pelo menos um caractere maiúsculo.",
"A senha deve conter pelo menos um dígito.",
"A senha deve conter pelo menos um caractere especial.",
"A senha deve ter no mínimo 8 caracteres."
];
}

return Object.keys(errors).length > 0 ? errors : false;

}
