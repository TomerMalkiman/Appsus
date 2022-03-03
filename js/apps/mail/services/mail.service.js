import { storageService } from "../../../services/async-storage-service.js"
import { utilService } from "../../../services/util.service.js";

export const mailService = {
    _createMails,
    deleteMail,
    query,
    getMail,
    toggleRead,
    toggleStar,
    remove
}

export const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
   }

const MAILS_KEY = 'mails'
// const DELETED_MAILS_KEY = 'deleted'


function getMail(mailId){
    return storageService.get(MAILS_KEY,mailId);
}

function query() {
    return storageService.query(MAILS_KEY);
}

function toggleRead(mailId){
    return query()
        .then( mails=>{
            var currMail = mails.find(mail => mail.id === mailId);
            currMail.isRead = !currMail.isRead;
            return storageService.put(MAILS_KEY,currMail);            

        })
}

function toggleStar(mailId){
    return query()
        .then( mails=>{
            var currMail = mails.find(mail => mail.id === mailId);
            currMail.isStarred = !currMail.isStarred;
            return storageService.put(MAILS_KEY,currMail);            

        })
}

function remove(mailId) {
    return storageService.remove(MAILS_KEY, mailId);
}

function deleteMail(mailId){
    return query()
    .then( mails=>{
        var currMail = mails.find(mail => mail.id === mailId);
        currMail.status = 'deleted';
        return storageService.put(MAILS_KEY,currMail);            
    })
}

// function _createDeletedMails(){
//     return query()
//         .then(deletedMails => {
//             console.log(deletedMails)
//             if(!deletedMails || !deletedMails.length){
//                 deletedMails = [{
                    
//                         id: utilService.makeId(),
//                         subject: 'Miss you!',
//                         body: 'Would love to catch up sometimes',
//                         isRead: true,
//                         isStarred: true,
//                         sentAt: 1611117798347,
//                         to: 'momo@momo.com',
//                         from: 'Mike'
//                     },
//                     {
//                         id: utilService.makeId(),
//                         subject: 'Miss you!',
//                         body: 'Would love to catch up sometimes',
//                         isRead: false,
//                         isStarred: true,
//                         sentAt: 1613214378220,
//                         to: 'momo@momo.com',
//                         from: 'David'
//                     },
//                     {
//                         id: utilService.makeId(),
//                         subject: 'hello!',
//                         body: 'Would love to see you Today',
//                         isRead: true,
//                         isStarred: false,
//                         sentAt: 1611224978098,
//                         to: 'momo@momo.com',
//                         from: 'Moshe'


//                 }]
//                 storageService.postMany(DELETED_MAILS_KEY, deletedMails)
//             }
//             return deletedMails;
//         })



function _createMails() {
    return query()
        .then(mails => {
            console.log(mails)
            if (!mails || !mails.length) {
                mails = [{
                        id: utilService.makeId(),
                        status : 'inbox',
                        subject: 'Hello!',
                        body: 'Would love to catch up sometimes',
                        isRead: false,
                        isStarred: true,
                        sentAt: 1611237578675,
                        to: 'momo@momo.com',
                        from: 'Tomer'
                    },
                    {
                        id: utilService.makeId(),
                        status : 'inbox',
                        subject: 'Sprint 3!',
                        body: 'Would love to catch up sometimes',
                        isRead: false,
                        isStarred: true,
                        sentAt: 1612345675457,
                        to: 'momo@momo.com',
                        from: 'Ben'
                    },
                    {
                        id: utilService.makeId(),
                        status : 'inbox',
                        subject: 'Why its not working!!!',
                        body: 'Would love to catch up sometimes',
                        isRead: true,
                        isStarred: false,
                        sentAt: 1611117778347,
                        to: 'momo@momo.com',
                        from: 'Shifra'
                    },
                    {
                        id: utilService.makeId(),
                        status : 'inbox',
                        subject: 'HELP!',
                        body: 'Im stuckk',
                        isRead: false,
                        isStarred: false,
                        sentAt: 1613214778220,
                        to: 'momo@momo.com',
                        from: 'Yankle'
                    },
                    {
                        id: utilService.makeId(),
                        status : 'inbox',
                        subject: 'Miss you!',
                        body: 'lets meet',
                        isRead: true,
                        isStarred: true,
                        sentAt: 1611222778098,
                        to: 'momo@momo.com',
                        from: 'David'
                    },
                    {
                        id: utilService.makeId(),
                        status : 'inbox',
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: true,
                        isStarred: false,
                        sentAt: 1601213718398,
                        to: 'momo@momo.com',
                        from: 'Tom'
                    },
                    {
                        id: utilService.makeId(),
                        status : 'inbox',
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: false,
                        isStarred: true,
                        sentAt: 1611947728457,
                        to: 'momo@momo.com',
                        from: 'Amir'
                    },
                    {
                        id: utilService.makeId(),
                        status : 'inbox',
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: false,
                        isStarred: true,
                        sentAt: 1612314678290,
                        to: 'momo@momo.com',
                        from: 'Tal'
                    },
                    {
                        id: utilService.makeId(),
                        status : 'inbox',
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: false,
                        isStarred: false,
                        sentAt: 1646233550000,
                        to: 'momo@momo.com',
                        from: 'Tomer'
                    },
                    {
                        id: utilService.makeId(),
                        status : 'inbox',
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes, talk with me baby!',
                        isRead: false,
                        isStarred: false,
                        sentAt: 1613138798220,
                        to: 'momo@momo.com',
                        from: 'Tomer'
                    },
                    {
                        id: utilService.makeId(),
                        status : 'inbox',
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: false,
                        isStarred: false,
                        sentAt: 1601312768173,
                        to: 'momo@momo.com',
                        from: 'Tomer'
                    }
                ]
                console.log(mails)
                storageService.postMany(MAILS_KEY, mails)
            }
            return mails;
        })
}