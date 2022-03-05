import { storageService } from "../../../services/async-storage-service.js";
import { utilService } from "../../../services/util.service.js";

export const noteService = {
    _createNotes,
    query,
    saveNote,
    deleteNote,
    togglePin,
    updateBgc,
    toggleTodo,
    duplicateNote,
    editNote,
}

const NOTES_KEY = 'notes';


function query() {
    return storageService.query(NOTES_KEY)
}

function editNote(noteId, newNote) {
    return storageService.get(NOTES_KEY, noteId)
        .then(note => {
            note = newNote;
            return storageService.put(NOTES_KEY, note)
        })
}

function deleteNote(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function duplicateNote(noteId) {
    return storageService.get(NOTES_KEY, noteId)
        .then(note => {
            return storageService.post(NOTES_KEY, note)
        })
}

function updateBgc(noteId, bgc) {
    return storageService.get(NOTES_KEY, noteId)
        .then(note => {
            note.style.backgroundColor = bgc;
            return storageService.put(NOTES_KEY, note)
        })
}

function toggleTodo(todoId, noteId) {
    return storageService.get(NOTES_KEY, noteId)
        .then(note => {
            const todo = note.info.todos.find(todo => todo.id === todoId)
            if (!todo.doneAt) todo.doneAt = Date.now();
            else todo.doneAt = null
            return storageService.put(NOTES_KEY, note)
        })
}

function togglePin(noteId) {
    return storageService.get(NOTES_KEY, noteId)
        .then(note => {
            note.isPinned = !note.isPinned;
            return storageService.put(NOTES_KEY, note)
        })
}

function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

function saveNote(note) {
    if (note.type === 'note-video') {
        const URL = youtube_parser(note.info.url)

        note = {
            id: utilService.makeId(),
            type: note.type,
            isPinned: false,
            info: {
                url: `https://www.youtube.com/embed/${URL}`,
                title: note.info.title
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        }
    } else if (note.type === 'note-txt') {
        note = {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: false,
            info: {
                title: note.info.title,
                txt: note.info.txt
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        }
    } else if (note.type === 'note-todos') {
        note = {
            id: utilService.makeId(),
            type: "note-todos",
            isPinned: false,
            info: {
                label: note.info.label,
                todos: note.info.todos
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        }
    } else if (note.type === 'note-img') {
        note = {
            id: utilService.makeId(),
            type: note.type,
            isPinned: false,
            info: {
                url: note.info.url,
                title: note.info.title
            },
            style: {
                backgroundColor: utilService.getRandomColor()
            }
        }
    }
    return query()
        .then(notes => {
            notes.push(note)
            console.log('posting')
            return storageService.post(NOTES_KEY, note)
        })
}

function _createNotes() {
    return query()
        .then(notes => {
            if (!notes || !notes.length) {
                notes = [{
                        id: utilService.makeId(),
                        type: "note-todos",
                        isPinned: true,
                        info: {
                            label: "Finish this sprint",
                            todos: [
                                { id: utilService.makeId(), txt: "Write code", doneAt: 187111111 },
                                { id: utilService.makeId(), txt: "Stare at code untill realizing why it's not working", doneAt: null },
                                { id: utilService.makeId(), txt: "Ask Amir for help and get no for an answer", doneAt: null },
                                { id: utilService.makeId(), txt: "Box shadow everywhere", doneAt: 187111111 }
                            ],
                        },
                        style: {
                            backgroundColor: utilService.getRandomColor()
                        }
                    },
                    {
                        id: utilService.makeId(),
                        type: "note-txt",
                        isPinned: true,
                        info: {
                            txt: "?כרוב וכרובית הם כרובי משפחה"
                        },
                        style: {
                            backgroundColor: utilService.getRandomColor()
                        }
                    },
                    {
                        id: utilService.makeId(),
                        type: "note-img",
                        isPinned: false,
                        info: {
                            url: "https://i.pinimg.com/originals/4f/b5/88/4fb5886838c0492fc4b0cee3de87b648.jpg",
                            title: "Programmer Life"
                        },
                        style: {
                            backgroundColor: utilService.getRandomColor()
                        }
                    },
                    {
                        id: utilService.makeId(),
                        type: "note-video",
                        isPinned: false,
                        info: {
                            url: "https://www.youtube.com/embed/tZKe908QmIg",
                            title: "Everything Black"

                        },
                        style: {
                            backgroundColor: utilService.getRandomColor()
                        }
                    },
                    {
                        id: utilService.makeId(),
                        type: "note-video",
                        isPinned: false,
                        info: {
                            url: "https://www.youtube.com/embed/qAYWw67yiN0",
                            title: "Some Songs"

                        },
                        style: {
                            backgroundColor: utilService.getRandomColor()
                        }
                    },
                    {
                        id: utilService.makeId(),
                        type: "note-img",
                        isPinned: false,
                        info: {
                            url: "https://i.imgflip.com/67f8oz.jpg",
                            title: "Box Shadow"
                        },
                        style: {
                            backgroundColor: utilService.getRandomColor()
                        }
                    },
                    {
                        id: utilService.makeId(),
                        type: "note-img",
                        isPinned: false,
                        info: {
                            url: "https://i.imgflip.com/67k6s6.jpg",
                            title: "Scratching pupiks"
                        },
                        style: {
                            backgroundColor: utilService.getRandomColor()
                        }
                    },
                    {
                        id: utilService.makeId(),
                        type: "note-img",
                        isPinned: false,
                        info: {
                            url: "https://25.media.tumblr.com/7ebe1f7cd648320a8b027cc182386132/tumblr_mhq8386AFz1rhcghpo1_400.gif",
                            title: "My mom when she needs help but I have a sprint to complete"
                        },
                        style: {
                            backgroundColor: utilService.getRandomColor()
                        }
                    },
                    {
                        id: utilService.makeId(),
                        type: "note-img",
                        isPinned: false,
                        info: {
                            url: "https://i.pinimg.com/originals/32/80/a9/3280a988c1d0d1ecd1be9f615c44e6b0.gif",
                            title: "Trying to apply Drag and Drop to my project"
                        },
                        style: {
                            backgroundColor: utilService.getRandomColor()
                        }
                    },
                ]
                return storageService.postMany(NOTES_KEY, notes);
            }
            return notes;
        })
}