import { booksService } from "../services/books-service.js";
import { eventBus } from "../services/eventBus-service.js";

export default {
  props: ["review"],
  template: `
        <section class="book-review">
          <button @click="removeReview(review.id)">X</button>
          <span class="user-name">{{review.username}}</span>
          <div class="txt">
          {{review.reviewTxt}}
          </div>
          <div class="stars">
            {{stars}}
          </div>
        </section>
    `,
  created() {
    const id = this.$route.params.bookId;
    booksService.getBookById(id).then((book) => {
      this.book = book});
  },
  data() {
    return {}
  },
  computed: {
    stars() {
      var starsDisplay = "";
      for (var i = 0; i < this.review.stars; i++) {
        starsDisplay += "⭐";
      }
      return starsDisplay;
    },
  },
  methods: {
    removeReview(reviewId) {
      if(!confirm('Are you sure?')) return;
      booksService.deleteReview(reviewId, this.book.id);
      eventBus.emit('show-msg', 'Review deleted!')
      location.reload();
    },
  },
};
