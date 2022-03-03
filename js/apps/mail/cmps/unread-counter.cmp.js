

// export default {
//     props: ["mails"],
//     template: `
//         <section>
//             {{unReadMailsAmount}}
//         </section>
//     `,
//     components: {
//         mailPreview
//     },
//     created() { },
//     data() {
//         return {

//         }
//     },
//     methods: {},
//     computed: {
//         unReadMailsAmount() {
//             console.log(this.mails)
//             this.mails.forEach(mail => {
//                 var readCounter = 0;
//                 if (mail.isRead) readCounter++;
//             })
//             return (readCounter / mails.length) * 100;
//         }
//     },
//     unmounted() { },
// }