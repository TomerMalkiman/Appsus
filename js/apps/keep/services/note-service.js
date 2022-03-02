import { storageService } from "../../../services/async-storage-service.js";
import { utilService } from "../../../services/util.service.js";

export const noteService = {
    _createNotes,
    query,
    saveNote,
}

const NOTES_KEY = 'notes';


function query() {
    return storageService.query(NOTES_KEY)
}

function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

function saveNote(note) {
    if (note.type === 'note-video' || note.type === 'note-img') {
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
                backgroundColor: "#fff"
            }
        }
    } else if (note.type === 'note-txt') {
        note = {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: false,
            info: {
                txt: note.info.txt
            },
            style: {
                backgroundColor: "#ffff"
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
                backgroundColor: "#fff"
            }
        }
    }
    return query()
        .then(notes => {
            notes.push(note)
            return storageService.put(NOTES_KEY, note)
        })
}

function _createNotes() {
    return query()
        .then(notes => {
            if (!notes || !notes.length) {
                notes = [{
                        id: utilService.makeId(),
                        type: "note-txt",
                        isPinned: true,
                        info: {
                            txt: "Fullstack Me Baby!"
                        },
                        style: {
                            backgroundColor: "#ffff"
                        }
                    },
                    {
                        id: utilService.makeId(),
                        type: "note-todos",
                        isPinned: false,
                        info: {
                            label: "Get my stuff together",
                            todos: [
                                { txt: "Driving liscence", doneAt: null },
                                { txt: "Coding power", doneAt: 187111111 }
                            ],
                        },
                        style: {
                            backgroundColor: "#fff"
                        }
                    },
                    {
                        id: utilService.makeId(),
                        type: "note-img",
                        isPinned: true,
                        info: {
                            url: "https://i.pinimg.com/originals/4f/b5/88/4fb5886838c0492fc4b0cee3de87b648.jpg",
                            title: "Bobi and Me"
                        },
                        style: {
                            backgroundColor: "#fff"
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
                            backgroundColor: "#fff"
                        }
                    },
                ]
                return storageService.postMany(NOTES_KEY, notes);
            }
            return notes;
        })
}