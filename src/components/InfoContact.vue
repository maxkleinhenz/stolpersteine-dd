<template>
  <InfoSubPageWrapper>
    <article>
      <section>
        <h3>{{ pageRecord.Info_Contact.title }}</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ratione
          debitis doloribus aperiam vel aut magnam quis quidem mollitia, magni
          explicabo ullam dicta asperiores cum dolore, enim sunt quaerat? Odio
          autem eius nostrum dolor at praesentium facilis voluptatibus
          architecto optio rerum, maxime quas explicabo iure quidem alias saepe
          in placeat voluptatum beatae accusamus nihil reiciendis amet? Expedita
          dolore repellendus deleniti magnam minima blanditiis animi veritatis
          ipsam quasi aliquam ullam porro officiis, nihil ex consequuntur
          ducimus rem iure voluptatibus vitae molestias necessitatibus adipisci
          itaque. Dolorem magnam eveniet, minima consectetur alias minus unde,
          nesciunt, id explicabo harum architecto sint aspernatur quae vel!
        </p>
      </section>
    </article>
  </InfoSubPageWrapper>
</template>

<script setup lang="ts">
import { usePages } from 'src/common/PageList';
import InfoSubPageWrapper from './InfoSubPageWrapper.vue';

const { pageRecord } = usePages();
</script>

<style scoped lang="scss"></style>
