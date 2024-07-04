const readline = require("node:readline")
const process = require("node:process")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function menu() {
    console.log("--------------------")
    console.log("NotesJS v1.0")
    console.log("--------------------")

    rl.question("1. Exibir notas \n" +
                "2. Nova nota \n" +
                "3. Ler nota \n" +
                "4. Excluir nota \n" +
                "5. Encerrar NoteJS \n\n" +
                "Digite o número da opção desejada: ", (option) => {

                    switch (option) {
                        case '1':
                            console.log("Exibindo notas...")
                            break;
                        case '2':
                            console.log("Criando nova nota...")
                            break;
                        case '3':
                            console.log("Lendo nota...")
                            break;
                        case '4':
                            console.log("Excluindo nota...")
                            break;
                        case '5':
                            console.log("Encerrando NoteJS...")
                        default:
                            console.log("Opção inválida! Tente novamente.")
                            break;
                    }

                }
    )
}

menu()