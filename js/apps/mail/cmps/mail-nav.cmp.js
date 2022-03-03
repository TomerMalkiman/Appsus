export default {
    props: ["mails"],
    template: `
          <section>
              <nav class="mail-nav">
                  <button class="compose-btn">Compose</button>
                  <div :class="optionSelected" @click="changeMode" @click="setStatus('inbox')"
                   class="inbox"> <span class="fa-solid fa-inbox"></span> Inbox</div>
                  <div @click="setStatus('starred')" class="starred"> <span class="fa-solid fa-star"></span> Starred</div>
                  <div @click="setStatus('sent-mails')" class="sent-mails"> <span  class="fa-solid fa-paper-plane" ></span> Sent</div>
                  <div @click="setStatus('deleted')" class="deleted-mails"> <span class="fa-solid fa-trash-can"></span> Deleted</div>
                  <div class="precantage" style='height:20px'>
                      <div class="precantage-color" style='height:20px' :style="[width,bgc]">{{unReadMailsDisplay}}</div>
                  </div>
              </nav>
          </section>
      `,
    components: {
    },
    created() { },
    data() {
        return {
            readCounter: 0,
            optionSelected:{
                inbox:true,
                starred: false,
                sent:false,
                deleted:false
            }
        }
    },
    methods: {
        setStatus(status) {
            console.log(status)
            this.$emit('status-changed', status)
        }
    },
    computed: {
        unReadMailsDisplay() {
            console.log(this.mails)
            this.mails.forEach(mail => {
                if (mail.isRead) this.readCounter++;
            })
            return ((this.readCounter / this.mails.length) * 100).toFixed() + '%';
        },

        bgc() {
            var color = 'red';
            const unreadPrecantage = ((this.readCounter / this.mails.length) * 100).toFixed();
            if (unreadPrecantage > 20) color = 'orange'
            else if (unreadPrecantage > 50) color = 'yellow'
            else if (unreadPrecantage > 80) color = 'green'
            return 'background-color : ' + color;

        },
        width() {
            const unreadPrecantage = ((this.readCounter / this.mails.length) * 100).toFixed();
            return 'width : ' + unreadPrecantage + '%';
        },
        redMode(){
          return {
                red: this.isRed,
            }
        },
        changeMode() {
            this.isRed = !this.isRed
            this.isGray = !this.isGray
        },

    },

    unmounted() { },
}