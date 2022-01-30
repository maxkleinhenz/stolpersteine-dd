<template>
  <div class="container-fliud">
    <div class="row g-2">
      <div class="col">
        <p class="fs-4 fw-bold my-0 text-wrap">{{ stolperstein.name }}</p>
        <p class="my-0 text-wrap">
          {{ stolperstein.strasse }} {{ stolperstein.hausnummer }}
        </p>
        <p class="my-0 text-wrap">
          {{ stolperstein.plz }} {{ stolperstein.ort }}
        </p>
      </div>
      <div class="bild col-auto bg-secondary rounded-circle"></div>
    </div>
    <div class="row mt-4">
      <div class="col">
        <button type="button" class="btn btn-primary round-border px-4">
          Zeige Stein
          <span class="d-inline-block ml-2">
            <font-awesome-icon :icon="['fas', 'chevron-right']" />
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Stolptersein from "@/models/stolperstein.model";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "StolpersteinListItem",
  props: {
    stolperstein: {
      required: true,
      type: Object as PropType<Stolptersein>,
    },
  },
  components: {},
});
</script>

<style lang="scss" scoped>
.bild {
  height: 75px;
  width: 75px;
}
.round-border {
  border-radius: 15px;
}
</style>
