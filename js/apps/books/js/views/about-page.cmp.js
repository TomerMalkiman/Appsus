export const cat = {
    template: `
    <section>
        <img class="pet-img" src="../../img/cat.jpeg" alt="" />    
    </section>
    `
}
export const dog = {
    template: `
    <section>
        <img class="pet-img" src="../../img/dog.jpeg" alt="" />    
    </section>
    `
}



export default {
  template: `
        <section class="main-app about">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident, nostrum minus. Eligendi laboriosam aspernatur mollitia beatae quo doloribus quibusdam qui minima eum eius. Molestias quia fugiat molestiae aspernatur dolorem facilis accusantium vero exercitationem, iure laborum magnam, reprehenderit omnis doloremque repellendus quo atque corrupti, nulla odio voluptatem harum soluta nam saepe.
            <div class="links">
                <router-link to="/about/cat">Cat</router-link>
                <router-link to="/about/dog">Dog</router-link>
            </div>
            <router-view />
        </section>
    `,
}