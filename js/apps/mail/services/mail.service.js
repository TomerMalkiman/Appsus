import { storageService } from "../../../services/async-storage-service.js"
import { utilService } from "../../../services/util.service.js";

export const mailService = {
    _createMails,
    deleteMail,
    query,
    getMail,
    toggleRead,
    toggleStar,
    remove,
    saveMail,
    readMail
}

export const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const MAILS_KEY = 'mails'
    // const DELETED_MAILS_KEY = 'deleted'

function saveMail(newMail) {
    return storageService.post(MAILS_KEY, newMail)
}


function getMail(mailId) {
    return storageService.get(MAILS_KEY, mailId);
}

function query() {
    return storageService.query(MAILS_KEY);
}

function toggleRead(mailId) {
    return query()
        .then(mails => {
            var currMail = mails.find(mail => mail.id === mailId);
            currMail.isRead = !currMail.isRead;
            return storageService.put(MAILS_KEY, currMail);

        })
}

function readMail(mailId) {
    return query()
        .then(mails => {
            var currMail = mails.find(mail => mail.id === mailId);
            currMail.isRead = true;
            return storageService.put(MAILS_KEY, currMail);

        })
}

function toggleStar(mailId) {
    return query()
        .then(mails => {
            var currMail = mails.find(mail => mail.id === mailId);
            currMail.isStarred = !currMail.isStarred;
            return storageService.put(MAILS_KEY, currMail);

        })
}

function remove(mailId) {
    return storageService.remove(MAILS_KEY, mailId);
}

function deleteMail(mailId) {
    return query()
        .then(mails => {
            var currMail = mails.find(mail => mail.id === mailId);
            currMail.status = 'deleted';
            return storageService.put(MAILS_KEY, currMail);
        })
}



function _createMails() {
    return query()
        .then(mails => {
            console.log(mails)
            if (!mails || !mails.length) {
                mails = [{
                        id: utilService.makeId(),
                        status: 'inbox',
                        subject: 'You have won a new car!',
                        body: 'Hey tomer, click here to get your car',
                        isRead: false,
                        isStarred: true,
                        isSent: false,
                        sentAt: 1611237578675,
                        to: 'momo@momo.com',
                        from: 'Unknown'
                    },
                    {
                        id: utilService.makeId(),
                        status: 'inbox',
                        subject: 'Virus on your computer!',
                        body: 'Someone hacked into your computer',
                        isRead: false,
                        isStarred: true,
                        isSent: false,
                        sentAt: 1611947728457,
                        to: 'momo@momo.com',
                        from: 'Microsoft'
                    },
                    {
                        id: utilService.makeId(),
                        status: 'inbox',
                        subject: 'Push pull',
                        body: 'Tomer lets do push and pull to be Synchronized',
                        isRead: true,
                        isStarred: false,
                        isSent: false,
                        sentAt: 1611117778347,
                        to: 'momo@momo.com',
                        from: 'Ben'
                    },
                    {
                        id: utilService.makeId(),
                        status: 'inbox',
                        subject: 'WTF have you done',
                        body: 'i have tons of git conflicts!!!',
                        isRead: false,
                        isStarred: false,
                        isSent: false,
                        sentAt: 1611222778098,
                        to: 'momo@momo.com',
                        from: 'Ben'
                    },
                    {
                        id: utilService.makeId(),
                        status: 'inbox',
                        subject: 'I trust you!',
                        body: 'Make a better mail than gmail',
                        isRead: true,
                        isStarred: true,
                        isSent: false,
                        sentAt:1601213718398 ,
                        to: 'momo@momo.com',
                        from: 'Amir'
                    },
                    {
                        id: utilService.makeId(),
                        status: 'inbox',
                        subject: 'Forget about the last mail',
                        body: 'Just make the mail work...',
                        isRead: true,
                        isStarred: false,
                        isSent: false,
                        sentAt: 1601312768173 ,
                        to: 'momo@momo.com',
                        from: 'Amir'
                    },
                    {
                        id: utilService.makeId(),
                        status: 'inbox',
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: false,
                        isStarred: true,
                        isSent: false,
                        sentAt:1612314678290,
                        to: 'momo@momo.com',
                        from: 'Nobody'
                    },
                    {
                        id: utilService.makeId(),
                        status: 'inbox',
                        subject: 'Credit warning!',
                        body: 'You cant use Lidor Waldman credit card anymore, please try other cresdit card',
                        isRead: false,
                        isStarred: true,
                        isSent: false,
                        sentAt:1612345675457,
                        to: 'momo@momo.com',
                        from: 'APIS Bank'
                    },
                    {
                        id: utilService.makeId(),
                        status: 'inbox',
                        subject: 'Hey tomer!',
                        body: 'You are my super hero!',
                        isRead: false,
                        isStarred: false,
                        isSent: false,
                        sentAt: 1646233853310,
                        to: 'momo@momo.com',
                        from: 'Spiderman'
                    },
                    {
                        id: utilService.makeId(),
                        status: 'inbox',
                        subject: 'Hey tomer!',
                        body: 'I saw your prdoject, sending you a 100 NIS voucher',
                        isRead: false,
                        isStarred: false,
                        isSent: false,
                        sentAt: 1646481561000,
                        to: 'momo@momo.com',
                        from: 'Latet organization'
                    },
                    {
                        id: utilService.makeId(),
                        status: 'inbox',
                        subject: 'Job reply',
                        body: 'Remove',
                        isRead: false,
                        isStarred: false,
                        isSent: false,
                        sentAt:   1613214778220,
                        to: 'momo@momo.com',
                        from: 'Google'
                    },
                    {
                        id: utilService.makeId(),
                        status: 'inbox',
                        subject: 'Remember me?',
                        body: 'come back to me, you dont need the other shit',
                        isRead: false,
                        isStarred: false,
                        isSent: false,
                        sentAt:   1643222778220,
                        to: 'momo@momo.com',
                        from: 'Hello world'
                    }
                ]
                console.log(mails)
                storageService.postMany(MAILS_KEY, mails)
            }
            return mails;
        })
}