import { storageService } from "../../../services/async-storage-service.js"
import { utilService } from "../../../services/util.service.js";

export const mailService = {
    _createMails,
    query,
}

const MAILS_KEY = 'mails'

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
                        to: 'momo@momo.com'
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: false,
                        sentAt: Date.now(),
                        to: 'momo@momo.com'
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: true,
                        sentAt: Date.now(),
                        to: 'momo@momo.com'
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: false,
                        sentAt: Date.now(),
                        to: 'momo@momo.com'
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: true,
                        sentAt: Date.now(),
                        to: 'momo@momo.com'
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: true,
                        sentAt: Date.now(),
                        to: 'momo@momo.com'
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: false,
                        sentAt: Date.now(),
                        to: 'momo@momo.com'
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: false,
                        sentAt: Date.now(),
                        to: 'momo@momo.com'
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: false,
                        sentAt: Date.now(),
                        to: 'momo@momo.com'
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: false,
                        sentAt: Date.now(),
                        to: 'momo@momo.com'
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Miss you!',
                        body: 'Would love to catch up sometimes',
                        isRead: false,
                        sentAt: Date.now(),
                        to: 'momo@momo.com'
                    }
                ]
                console.log(mails)
                storageService.postMany(MAILS_KEY, mails)
            }
            return mails;
        })
}