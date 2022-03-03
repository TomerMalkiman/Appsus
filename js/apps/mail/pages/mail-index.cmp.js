import mailList from "../cmps/mail-list.cmp.js"
import { mailService } from "../services/mail.service.js"
import addMail from "../cmps/add-mail.cmp.js"
import mailNav from "../cmps/mail-nav.cmp.js"
import mailFilter from "../cmps/mail-filter.cmp.js"

export default {
    // props: [""],
    template: `
        <mail-filter @filtered="setFilter"></mail-filter>
        <section class="main-layout mails-screen">
            <mail-nav></mail-nav>
            <mail-list @remove="removeMail" @toggle-read="toggleRead" :mails="mailsForDisplay"></mail-list>
        </section>
        
    `,
    components: {
        mailList,
        mailNav,
        mailFilter

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
            filterBy:null,
            deletedMails: null
        }
    },
    methods: {
        loadMails(){
            mailService.query()
            .then(mails => this.mails = mails);
        },
        loadDeletedMails(){
            mailService.query()
            .then(deletedMails => this.deletedMails = deletedMails);

        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
            console.log(this.filterBy)
        },

        toggleRead(mailId){
            mailService.toggleRead(mailId)
                .then(mail => {
                    this.mails.find(mail => mail.id === mailId).isRead = mail.isRead;
                  })
        },
        removeMail(mailId){
            mailService.remove(mailId)
                .then( () => {
                    const idx = this.mails.findIndex((mail) => mail.id === mailId);
                    this.deletedMails = this.mails.splice(idx, 1);
                    console.log(this.deletedMails)

                    
                })
        },
        


    },
    computed: {
        mailsForDisplay() {
            console.log('filtering!')
            if (!this.filterBy) return this.mails;
            var mails = this.mails;
            if (this.filterBy.readMail) {
              mails = mails.filter((mail) => mail.isRead)
            }
            if (this.filterBy.unReadMail) {
                mails = mails.filter((mail) => !mail.isRead)
              }
            if (this.filterBy.byName) {
              let regex = new RegExp(this.filterBy.byName, 'i')
              mails = mails.filter((mail) => {
                if (regex.test(mail.subject)) return mail
                if (regex.test(mail.body)) return mail
              })
            }
            console.log(mails);
            return mails;
        }
    },
    unmounted() {},
}

