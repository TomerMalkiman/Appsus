import { eventBus } from '../../../services/eventBus-service.js'
import { mailService } from '../services/mail.service.js'


export default {
    template: `
     <section class="add-mail" :class="modalStatus" :style="newMailUpDown">
             <div @click="toggleNewMail" class="send-mail-top">
                  <h2>New Massage</h2>
                  <div class="sent-buttons-container">
                      <span class="toggle-new-mail" @click="toggleNewMail">|</span>
                     <span class="close-new-mail" @click="closeModal">X</span>
                  </div>
            </div>

              <section class="inputs-container">
                 <form >
                    <div class="addressee-input-container">
                         <input class="send-mail-input" type="email"  
                          v-model="newMail.to" placeholder="To" >
                   </div>

                   <div class="subject-input-container"> 
                        <input class="send-mail-subject" type="text"
                        v-model="newMail.subject" placeholder="Subject">
                   </div>  
                  
                        <div> 
                            <textarea class="send-mail-text"   
                            v-model="newMail.body"></textarea>
                        </div> 

                        <div class="new-mail-btns">   
                            <button class="submit-send-btn" @click="sendMail(newMail)">Send</button>
                            <div class="new-mail-remove-btn btn" @click="closeModal"><i class=" fa-solid fa-trash-can fa-2x"></i></div>
                        </div> 
                </form>  
           </section>    

    </section>
      `,
    data() {
        return {
            newMail: {
                id: '',
                status: 'inbox',
                subject: '',
                body: '',
                isRead: false,
                isStarred: false,
                isSent: true,
                sentAt: Date.now(),
                to: '',
                from: ''
            },

            displayModal: false,
            isNewMailOpen: false
        }
    },
    created() {
        this.unsubscribe = eventBus.on('compose', this.openModal)
    },
    methods: {
        sendMail(mail) {
            mail.from = 'Moshiko'
            mailService.saveMail(mail)
                .then(newMail => {
                    this.displayModal = false
                    this.$emit('addMail', newMail)
                })

        },
        openModal() {
            this.displayModal = true
        },
        closeModal(e) {
            e.stopPropagation()
            this.isNewMailOpen = false
            this.displayModal = false
        },
        toggleNewMail(e) {
            e.stopPropagation()
            this.isNewMailOpen = !this.isNewMailOpen
        },

    },
    computed: {
        modalStatus() {
            console.log(this.displayModal);
            return (this.displayModal) ? 'open-send-mail' : '';
        },
        newMailUpDown() {
            if (window.innerWidth <= 890 && this.isNewMailOpen) return 'transform: translate(75%, 93%)'
            return (this.isNewMailOpen) ? 'transform: translate(150%, 93%)' : '';

        }
    },
    unmounted() {
        this.unsubscribe();
    }
}