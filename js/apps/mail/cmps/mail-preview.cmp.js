
export default {
  props: ["mail"],
  template: `
        <section class="mail-preview">
        <div class="mail-sender-name">{{mail.from}}</div>
        <div class="mail-subject">{{mail.subject}}</div>
        <div class="mail-content">{{mail.body}}</div>
        <div class="mail-date">{{sentAt}}</div>
        </section>
        <hr>
    `,
  components: {},
  created() {},
  data() {
    return {}
  },
  methods: {

  },
  computed: {
      sentAt(){
          
      }
  },
  unmounted() {},
}













// template: `
// <section class="img-preview-conatiner">
//     <img :src="bookImgUrl">
// </section> 

// <section class="book-title">
//     <h2> {{book.title}}</h2>
// </section>

// <p><span class="detail-title">Author :</span> {{getAuthors}}</p>
// <p><span class="detail-title">Price :</span>  {{book.listPrice.amount}}<span >{{getCurrencySign}}</span> </p>