import { eventBus } from "../services/eventBus-service.js";
import bookPreviewCmp from "./book-preview.cmp.js";

export default {
  props: ["books"],
  template: `
        <section>
            <section class="books-list main-app">
                <ul>
                    <li v-for="book in books" :key="book.id" class="book-preview-container">
                        <book-preview-cmp @bookDelete="deleteBook" @selected="selectBook" :book="book"/>
                    </li>
                </ul>
            </section>
        </section>
    `,
  components: {
    bookPreviewCmp,
  },
  created() {
    eventBus.on("add-book", this.addNewBook);
  },
  data() {
    return {};
  },
  methods: {
    selectBook(id) {
      this.$emit("selected", id);
    },
    deleteBook(id) {
      this.$emit("bookDelete", id);
    },
    addNewBook(book) {
      book.then((book) => this.books.unshift(book));
    },
  },
  unmounted() {},
};
