import { eventBus } from '../../../services/eventBus-service.js'


export default {
    props: ["mails"],
    template: `
          <section>
              <nav class="mail-nav">
                  <div @click="compose" class="compose-btn">
                      <img src="img/mail-icons/compose.jpg" alt="">
                      <!-- <img src="../../../../img/mail-icons/compose.jpg" alt=""> -->

                      <div> Compose </div>
                  </div>
                  <div :class="optionSelected" @click="changeMode" @click="setStatus('inbox')"
                   class="inbox" :style="filterBy === 'inbox' ? 
                   'background-color: #fce8e6;color:#D93025;font-weight:bold' : ''"> 
                   <span class="fa-solid fa-inbox"></span> <span v-if="width > 890"> Inbox </span></div>

                  <div @click="setStatus('starred')" class="starred"
                   :style="filterBy === 'starred' ? 'background-color: #e8eaed;font-weight:bold' : ''" > 
                      <span class="fa-solid fa-star"></span> <span v-if="width > 890">  Starred </span></div>

                  <div @click="setStatus('sent-mails')" class="sent-mails"
                  :style="filterBy === 'sent-mails' ? 'background-color: #e8eaed;font-weight:bold' : ''"> 
                      <span  class="fa-solid fa-paper-plane" ></span> <span v-if="width > 890">  Sent </span></div>

                  <div @click="setStatus('deleted')" class="deleted-mails"
                  :style="filterBy === 'deleted' ? 'background-color: #e8eaed;font-weight:bold' : ''">
                       <span class="fa-solid fa-trash-can"></span>  <span v-if="width > 890"> Deleted </span></div>

                  <div class="perecantage" v-if="width > 890">
                      <div class="perecantage-color" >
                             <svg> 
                                    <circle cx="70" cy="70" r="70"> </circle>
                                     <circle :style="[colorCircle,bgc]" cx="70" cy="70" r="70"> </circle>
                             </svg>
                             <div class="unread-num">
                                 <h2>{{unReadMailsDisplay}}<span>%</span></h2>
                             </div>
                      </div>
                        <h2 class="unread-text">Unread mails</h2>
                  </div>
              </nav>
          </section>
          
      `,
    components: {},
    created() {
        window.addEventListener("resize", () => {
            this.width = window.innerWidth
        })
    },
    data() {
        return {
            filterBy: 'inbox',
            width: window.innerWidth
        }
    },
    methods: {
        setStatus(status) {
            this.filterBy = status;
            this.$emit('status-changed', status)
        },
        compose() {
            eventBus.emit('compose', true)
        },
    },
    computed: {
        unReadMailsDisplay() {
            const mailsAmount = (this.mails.length) ? this.mails.length : 1; //prevent dividing by 0;
            var unReadMails = 0;
            this.mails.forEach(mail => {
                if (mail.isRead && !mail.isDeleted) unReadMails++;
            })
            return ((unReadMails / mailsAmount) * 100).toFixed();
        },

        bgc() {
            var strokeColor = '#98FB98';
            const unreadPrecantage = this.unReadMailsDisplay
            if (unreadPrecantage > 80) strokeColor = 'red'
            else if (unreadPrecantage > 50) strokeColor = 'orange'
            else if (unreadPrecantage > 20) strokeColor = '#F9F871'
            return 'stroke : ' + strokeColor;

        },
        width() {
            const unreadPrecantage = this.unReadMailsDisplay;
            return 'width : ' + unreadPrecantage + '%';
        },
        setInboxColor() {
            return (this.filterBy === 'inbox') ? 'inbox-nav' : '';
        },
        colorCircle() {
            return `stroke-dashoffset: calc(440 - (440*${this.unReadMailsDisplay}) / 100);`
        }
    },
    setColor(filter) {
        return this.filterBy === filter ? 'nav-option' : '';

    },

    unmounted() {},
}