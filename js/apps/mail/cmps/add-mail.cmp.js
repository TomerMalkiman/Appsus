import { eventBus } from '../../../services/eventBus-service.js'
import { mailService } from '../services/mail.service.js'


export default {
  template: `
     <section class="add-mail" :class="modalStatus">
             <div class="send-mail-top">
                  <h2>New Massage</h2>
                  <button @click="closeModal">x</button>
              </div>
                 <form >
                    <div class="send-mail-input">
                    To<input type="email"  v-model="newMail.to" ></div> 

                   <div class="send-mail-subject"> 
                     Subject<input type="text"  v-model="newMail.subject"></div>  

                   <div> 
                   <textarea rows="15" cols="50"  v-model="newMail.body"></textarea>
                   </div>     
                   <button class="submit-send-btn" @click="sendMail(newMail)">send</button>
                </form>      
             </div> 
    </section>
      `,
  data() {
    return {
      newMail: {
        id:'',
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
          this.$emit('addMail',newMail)
        })

    },
    openModal() {
      this.displayModal = true
    },
    closeModal() {
      this.displayModal = false
    },
  },
  computed: {
    modalStatus() {
      return (this.displayModal) ? 'open-send-mail' : '';
    },
  },
  unmounted() {
    this.unsubscribe();
}
}