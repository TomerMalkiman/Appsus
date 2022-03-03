import mailList from "../cmps/mail-list.cmp.js"
import { mailService } from "../services/mail.service.js"
import addMail from "../cmps/add-mail.cmp.js"
import mailNav from "../cmps/mail-nav.cmp.js"
import mailFilter from "../cmps/mail-filter.cmp.js"

export default {
    // props: [""],
    template: `
        <mail-filter @filtered="setFilter" ></mail-filter>
        <section class="main-layout mails-screen">
            <section class="nav-container">
            <mail-nav  v-if="mails"  @status-changed="setStatus" :mails="mailsForDisplay" />
            <div v-if="mails">{{unReadMailsDisplay}}</div>
            </section>
            <mail-list v-if="mails" @delete="deleteMail" @remove="removeMail" @toggle-read="toggleRead" :mails="mailsForDisplay"></mail-list>
        </section>
        <add-mail></add-mail>
        
    `,
    components: {
        mailList,
        mailNav,
        mailFilter,
        addMail
        

    },
    created() {
        mailService._createMails()
            .then(mails => {
                this.mails = mails
            })
    },
    data() {
        return {
            mails: null,
            filterBy: null,
            currStatus: 'inbox',
            readCounter: 0
        }
    },
    methods: {
        loadMails() {
            mailService.query()
                .then(mails => this.mails = mails);
        },

        setFilter(filterBy) {
            this.filterBy = filterBy;
        },

        toggleRead(mailId) {
            mailService.toggleRead(mailId)
                .then(mail => {
                    this.mails.find(mail => mail.id === mailId).isRead = mail.isRead;
                })
        },
        removeMail(mailId) {
            mailService.remove(mailId)
                .then(() => {
                    const idx = this.mails.findIndex((mail) => mail.id === mailId);
                    this.mails.splice(idx, 1);
                })
        },
        deleteMail(mailId) {
            mailService.deleteMail(mailId)
                .then(mail => {
                    this.mails.find(mail => mail.id === mailId).status = mail.status;
                })
        },
        setStatus(status) {
            this.currStatus = status
        }


    },
    computed: {
        mailsForDisplay() {
            if (this.currStatus === 'starred') {
                var mails = this.mails.filter(mail => ((mail.status === 'inbox') && mail.isStarred))
            } else var mails = this.mails.filter(mail => mail.status === this.currStatus)

            if (!this.filterBy) return mails;

            if (this.filterBy.read === 'read') {
                mails = mails.filter((mail) => mail.isRead)
            } else if (this.filterBy.read === 'unRead') {
                mails = mails.filter((mail) => !mail.isRead)
            } else mails = this.mails;

            if (this.filterBy.byName) {
                let regex = new RegExp(this.filterBy.byName, 'i')
                mails = mails.filter((mail) => {
                    if (regex.test(mail.subject)) return mail
                    if (regex.test(mail.body)) return mail
                })
            }
            return mails;
        },

    },
    unmounted() {},
}