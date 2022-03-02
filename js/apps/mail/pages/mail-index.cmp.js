import mailList from "../cmps/mail-list.cmp.js"
import { mailService } from "../services/mail.service.js"

export default {
    // props: [""],
    template: `
        <section class="main-layout">
          <mail-list @remove="removeMail" @toggle-read="toggleRead" :mails="mails"></mail-list>
        </section>
    `,
    components: {
        mailList,

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
            filtrBy:null,
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
      
    },
    unmounted() {},
}

// removeCar(id) {
//     carService.remove(id)
//         .then(() => {
//             const idx = this.cars.findIndex((car) => car.id === id);
//             this.cars.splice(idx, 1);
//             eventBus.emit('show-msg', { txt: 'Deleted succesfully', type: 'success' });
//         })
//         .catch(err => {
//             console.error(err);
//             eventBus.emit('show-msg', { txt: 'Error - please try again later', type: 'error' });
//         });
// },
// setFilter(filterBy) {
//     this.filterBy = filterBy;
// }
// },