const readline = require("node:readline")
const process = require("node:process")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const fs = require("node:fs")
const path = require("node:path")
const { error } = require("node:console")

function menu() {
    console.clear()
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
                            rl.question('\nDeseja continuar? (s/n): ', (answer) => {
                                nextAction(answer)
                            })
                            break;
                        case '2':
                            createNote()
                            // rl.question('\nDeseja continuar? (s/n): ', (answer) => {
                            //     nextAction(answer)
                            // })
                            break;
                        case '3':
                            readNote()
                            rl.question('\nDeseja continuar? (s/n): ', (answer) => {
                                nextAction(answer)
                            })
                            break;
                        case '4':
                            deleteNote()
                            // rl.question('\nDeseja continuar? (s/n): ', (answer) => {
                            //     nextAction(answer)
                            // })
                            break;
                        case '5':
                            console.log("Encerrando NoteJS...");
                            process.exit(1)
                            break;
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

function createNote() {
    console.clear()
    console.log("--------------------")
    console.log("Nova nota")
    console.log("--------------------")

    const notes_path = path.join(__dirname, './notes') //   .../NoteJS/notes 


    rl.question("Informe o nome da nota: ", (note_name) => {        //captura o nome da nota como note_name
        rl.question("Conteúdo da nota: \n", (note_content) => {     //captura o conteudo da nota com note_content
            
            try {
                
                fs.writeFile(`${notes_path}/${note_name}.txt`, note_content, 'utf-8', (error) => {   //cria a nota usando template literal (caminho absoluto até aqui/arquivo.extensão), conteúdo do arquivo
                    if (error) {
                        console.log('Erro ao ESCREVER conteúdo: ', error.message)
                        menu()
                    }
                    console.log(`Nota (${note_name}) criada com sucesso!`)
                    rl.question('\nDeseja continuar? (s/n): ', (answer) => {
                        nextAction(answer)
                    })
                })

            } catch (error) {
                console.log("Erro ao CRIAR a nota: ", error.message)
                menu()
            }
        })
    })
}

function readNote() {
    console.clear()
    console.log("--------------------")
    console.log("Leia notas")
    console.log("--------------------")

    const notes = fs.readdirSync(path.join(__dirname, './notes'))       //[ 'Hello world!.txt', 'nota.txt' ]
    listNotes()

    rl.question('Informe o índice da nota que deseja ler: ', (index) => {
        try {
            console.log('\n' + fs.readFileSync(path.join(__dirname, `./notes/${notes[index-1]}`)) + '\n')       //...NoteJS/notes/nota a ser lida
        } catch (error) {
            console.log('Erro ao ler nota: ', error.message)
        }
    })
}

function deleteNote() {
    console.clear()
    console.log("--------------------")
    console.log("Exclua uma notas")
    console.log("--------------------")

    listNotes()
    const notes = fs.readdirSync(path.join(__dirname, './notes'))       //[ 'Hello world!.txt', 'nota.txt' ]

    rl.question('Informe o índice da nota a ser excluída: ', (index) =>{
        try {
            const noteToDelete = path.join(__dirname, `./notes/${notes[index-1]}`)

            rl.question(`A nota '${path.basename(noteToDelete)}' será exluída.\nDeseja continuar? (s/n): `, (answer) => {
                if (answer.trim().toLowerCase === 'n') {
                    return console.log(`Operação cancelada pelo usuário.\nA nota ${noteToDelete} não foi excluída.`)
                }
                fs.unlink(noteToDelete, (error) => {
                    if (error) {
                        console.log('Erro ao deletar nota: ', error.message)
                    }
                    console.log(`Nota ${path.basename(noteToDelete)} foi excluída com sucesso!`)
                    rl.question('\nDeseja continuar? (s/n): ', (answer) => {
                        nextAction(answer)
                    })
                })
            })

        } catch (error) {
            console.log('Erro ao excluir nota: ', error.message)
        }
    })
}

function nextAction(action) {
    if (action.trim().toLowerCase() === 's') {
        menu()
    } else {
        process.exit(0)
    }
}

menu()