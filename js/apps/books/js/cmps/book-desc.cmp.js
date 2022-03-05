export default {
  props: ["txt"],
  template: `
        <section>
            {{hunderdChar}}{{continualTxt}}
            <span @click="exposeFullDesc" class="see-more">{{seeMore}}</span>
        </section>
    `,
  data() {
    return {
      isFullTxt: false,
    };
  },
  methods: {
    exposeFullDesc() {
      !this.isFullTxt ? (this.isFullTxt = true) : (this.isFullTxt = false);
    },
  },
  computed: {
    seeMore() {
      if(!this.txt) return
      if (this.isFullTxt) return "show less...";
      if (!this.isFullTxt && this.txt.length > 100) return "see more...";
    },
    hunderdChar() {
      return this.txt ? this.txt.slice(0, 100): '';
    },
    continualTxt() {
      return this.isFullTxt ? this.txt.slice(100, this.txt.length) : "";
    },
  },
};
