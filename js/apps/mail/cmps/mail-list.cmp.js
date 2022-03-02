import mailPreview from "./mail-preview.cmp.js"

export default {
  props: ["mails"],
  template: `
        <section class="mail-list">
            <ul class="clean-list">
                <li v-for="mail in mails" :key="mail.id">
                    <mail-preview :mail="mail"/>
                </li>

            </ul>


        </section>
    `,
  components: {
      mailPreview
  },
  created() {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
  unmounted() {},
}


