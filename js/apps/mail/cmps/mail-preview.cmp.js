
export default {
  props: ["mail"],
  template: `
      
        <section :style="bgc"  @mouseover="isHover = false"  @mouseleave="isHover = true"
         class="mail-preview">
        <router-link :to="'/mail/'+mail.id">
          <div :style="isStarred" ><i @click.native.prevent="toggleStar(mail.id)" 
          :class="isStarred" aria-hidden="true"></i></div>
            <div :style="isRead" class="mail-sender-name">{{mail.from}}</div>
            <div :style="isRead" class="mail-subject">{{mail.subject}}</div>
            <div class="mail-content">{{mailContent}}</div>
            <div v-if="isHover":style="isRead" class="mail-date">{{sentAt}}</div>
            <div class="actions-btns">
                <button class="mail-remove-btn btn" @click.native.prevent="remove(mail.id)"><i class=" fa-solid fa-trash-can"></i></button>
                <button class="mail-read-btn btn" @click.native.prevent="toggleRead(mail.id)"><i :class="isReadText"></i></button>
            </div>
            </router-link>
        </section>
        
       
   

    `,
  components: {},
  created() { },
  data() {
    return {
      isHover: true
    }
  },
  methods: {
    toggleRead(mailId) {
      this.$emit('toggle-read', mailId)
    },
    remove(mailId) {
      this.$emit('remove', mailId);
    },
    toggleStar(mailId){
      this.$emit('mark-star',mailId)

    }

  },
  computed: {
    mailContent() {
      return (this.mail.body.length > 30) ?
        this.mail.body.slice(0, 30) + '...' :
        this.mail.body;

    },
    mailSubject() {
      return (this.mail.subject.length > 30) ?
        this.mail.subject.slice(0, 30) + '...' :
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
    isStarred(){
      return this.mail.isStarred ? 'fa-solid fa-star star' : 'fa fa-star-o' ;
    },

    sentAt() {
      var mailDate = new Date(this.mail.sentAt);
      var timeDiff = Date.now() - this.mail.sentAt;
      // console.log(this.mail.sentAt)
      // console.log('mailDate', mailDate)
      // console.log('timeDiff', timeDiff)
      if (timeDiff < 86400000) {// A day
        // console.log('Today!')
        return mailDate.getHours() + ':' + ((mailDate.getMinutes() < 10) ?
          '0' + (mailDate.getMinutes() + 1) : mailDate.getMinutes());

      }
      else if (timeDiff > 31556926000) {//31556926000 is a year in timeStamp
        // console.log('befor a year!')
        // console.log(mailDate)
        // console.log(mailDate.getDay(), mailDate.getMonth())
        return mailDate.getDay() + '/'
          + (mailDate.getMonth() + 1) + '/'
          + mailDate.getFullYear()
      }
      else return mailDate.getDay() + ' / ' + mailDate.getMinutes();
    }
  },
  unmounted() { },
}












