import { booksService } from "../services/books-service.js";
import booksListCmp from "../cmps/books-list.cmp.js";
import booksFilterCmp from "../cmps/books-filter.cmp.js";
import searchBook from "../cmps/search-book.cmp.js";

export default {
  // props: [""],
  template: `
        <section class="main-app">
            <search-book />
            <books-filter-cmp v-if="!selectedBook" @filtered="setFilter"></books-filter-cmp>
            <books-list-cmp @bookDelete="deleteBook" @selected="selectBook" v-if="!selectedBook" :books="booksForDisplay"/>
        </section>
    `,
  components: {
    booksListCmp,
    booksFilterCmp,
    searchBook,
  },
  created() {
    booksService.query().then((books) => (this.books = books));
  },
  data() {
    return {
      books: null,
      filterBy: null,
      selectedBook: null,
    };
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    selectBook(id) {
      let book = this.books.find((book) => book.id === id);
      this.selectedBook = book;
    },
    goBack() {
      this.selectedBook = null;
    },
    deleteBook(id) {
      booksService.deleteBook(id);
      const idx = this.books.findIndex((book) => book.id === id);
      this.books.splice(idx, 1);
    },
  },
  computed: {
    booksForDisplay() {
      if (!this.filterBy) return this.books;
      const regex = new RegExp(this.filterBy.name, "i");
      return this.books.filter(
        (book) =>
          regex.test(book.title) &&
          book.listPrice.amount > this.filterBy.fromPrice &&
          book.listPrice.amount < this.filterBy.toPrice
      );
    },
  },
};
