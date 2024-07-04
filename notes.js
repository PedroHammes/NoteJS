const readline = require("node:readline")
const process = require("node:process")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const fs = require("node:fs")
const path = require("node:path")

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
                            listNotes()
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

function listNotes() {
    console.clear()
    console.log("--------------------")
    console.log("Exibindo notas")
    console.log("--------------------")

    const notes = fs.readdirSync(path.join(__dirname, './notes'))
    
    if (notes.length == 0) {
        console.log("A pasta notes está vazia. Crie sua primeira nota para vê-la aqui.")
    } else {
        notes.forEach((note, index) => {
            console.log(`${index+1}. ${note}`)
        })
    }

}

menu()