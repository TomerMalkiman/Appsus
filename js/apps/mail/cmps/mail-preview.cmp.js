
export default {
  props: ["mail"],
  template: `
      
        <section :style="bgc" @click="readMail(mail.id)" @mouseover="isHover = false"  @mouseleave="isHover = true"
         class="mail-preview">
        <router-link :to="'/mail/'+mail.id">
          <div :style="isStarred" class="star" ><i @click.native.prevent="toggleStar(mail.id)" 
          :class="isStarred" aria-hidden="true"></i></div>
            <div :style="isRead" class="mail-sender-name">{{mail.from}}</div>
            <div :style="isRead" class="mail-subject">{{mail.subject}}</div>
            <div class="mail-content">{{mailContent}}</div>
            <div v-if="isHover":style="isRead" class="mail-date">{{sentAt}}</div>
            <div class="actions-btns">
                <div class="mail-remove-btn btn" @click.native.prevent="remove(mail.id)"><i class=" fa-solid fa-trash-can"></i></div>
                <div class="mail-read-btn btn" @click.native.prevent="toggleRead(mail.id)"><i :class="isReadText"></i></div>
            </div>
            </router-link>
        </section>
        
       
   

    `,
  components: {},
  created() { },
  data() {
    return {
      isHover: true,
      width: window.innerWidth
    }
  },
  methods: {
    toggleRead(mailId) {
      this.$emit('toggle-read', mailId)
    },
    remove(mailId) {
      this.$emit('remove', mailId);
    },
    toggleStar(mailId) {
      this.$emit('mark-star', mailId)
    },
    readMail(mailId) {
      this.$emit('read-mail', mailId)
    }

  },
  computed: {
    mailContent() {
      if (this.mail.body.length > 30 && this.width >= 1120) return this.mail.body.slice(0, 30) + '...'
      else if (this.mail.body.length > 70 && this.width <= 1120) return this.mail.body.slice(0, 70) + '...'
      return this.mail.body;

    },
    mailSubject() {
      return (this.mail.subject.length > 20) ?
        this.mail.subject.slice(0, 20) + '...' :
        this.mail.subject;

    },


    bgc() {
      return this.mail.isRead ? `background-color : #ECECEC` : '';
    },
    isRead() {
      return this.mail.isRead ? '' : `font-weight: bold`;
    },

    isReadText() {
      return this.mail.isRead ? `fa-solid fa-square-envelope` : 'fa-solid fa-envelope-open';
    },
    isStarred() {
      return this.mail.isStarred ? 'fa-solid fa-star star-yellow' : 'fa fa-star-o';
    },

    sentAt() {
      var mailDate = new Date(this.mail.sentAt);
      var timeDiff = Date.now() - this.mail.sentAt;
      console.log(this.mail.sentAt)

      var myDateStr;
      mailDate.setDate(mailDate.getDate() + 20);

      if (timeDiff < 86400000) {// A day
        const AMPM = (mailDate.getHours() > 12) ? ' PM' : ' AM';
        return mailDate.getHours() + ':' + ((mailDate.getMinutes() < 10) ?
          '0' + (mailDate.getMinutes() + 1) : mailDate.getMinutes()) + AMPM;

      }
      else if (timeDiff > 31556926000) {//31556926000 is a year in timeStamp
        myDateStr = ('0' + mailDate.getDate()).slice(-2) + '/'
          + ('0' + (mailDate.getMonth() + 1)).slice(-2) + '/'
          + mailDate.getFullYear();

        return myDateStr
      }
      else {
        const mon = new Intl.DateTimeFormat('en', { month: 'short' }).format(mailDate)
        const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(mailDate)
        return `${day}-${mon}`
      }
    }
  },
  unmounted() { },
}


var MyDate = new Date();
var MyDateString;

MyDate.setDate(MyDate.getDate() + 20);

MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/'
  + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '/'
  + MyDate.getFullYear();






