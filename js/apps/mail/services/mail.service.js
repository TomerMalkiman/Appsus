import { storageService } from "../../../services/async-storage-service.js"
import { utilService } from "../../../services/util.service.js";

export const mailService = {
    _createMails,
    query,
}

export const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
   }

const MAILS_KEY = 'mails'


function getUser(){

}

function query() {
    return storageService.query(MAILS_KEY);
}

function _createMails() {
    return query()
        .then(mails => {
            console.log(mails)
            if (!mails || !mails.length) {
                mails = [{
                        id: utilService.makeId(),
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: false,
                        sentAt: Date.now(),
                        to: 'momo@momo.com',
                        from: 'Tomer'
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: false,
                        sentAt: Date.now(),
                        to: 'momo@momo.com',
                        from: 'Ben'
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: true,
                        sentAt: Date.now(),
                        to: 'momo@momo.com',
                        from: 'Shifra'
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: false,
                        sentAt: Date.now(),
                        to: 'momo@momo.com',
                        from: 'Yankle'
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: true,
                        sentAt: Date.now(),
                        to: 'momo@momo.com',
                        from: 'David'
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: true,
                        sentAt: Date.now(),
                        to: 'momo@momo.com',
                        from: 'Tom'
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: false,
                        sentAt: Date.now(),
                        to: 'momo@momo.com',
                        from: 'Amir'
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: false,
                        sentAt: Date.now(),
                        to: 'momo@momo.com',
                        from: 'Tal'
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: false,
                        sentAt: Date.now(),
                        to: 'momo@momo.com',
                        from: 'Tomer'
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: false,
                        sentAt: Date.now(),
                        to: 'momo@momo.com',
                        from: 'Tomer'
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: false,
                        sentAt: Date.now(),
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