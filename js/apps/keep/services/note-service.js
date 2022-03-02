import { storageService } from "../../../services/async-storage-service.js";
import { utilService } from "../../../services/util.service.js";

export const noteService = {
    _createNotes,
    query,
}

const NOTES_KEY = 'notes';


function query() {
    return storageService.query(NOTES_KEY)
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
                        }
                    },
                    {
                        id: utilService.makeId(),
                        type: "note-todos",
                        info: {
                            label: "Get my stuff together",
                            todos: [
                                { txt: "Driving liscence", doneAt: null },
                                { txt: "Coding power", doneAt: 187111111 }
                            ],
                        }
                    },
                    {
                        id: utilService.makeId(),
                        type: "note-img",
                        info: {
                            url: "http://some-img/me",
                            title: "Bobi and Me"
                        },
                        style: {
                            backgroundColor: "#00d"
                        }
                    }
                ]
                return storageService.postMany(NOTES_KEY, notes);
            }
            return notes;
        })
}