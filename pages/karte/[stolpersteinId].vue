<template>
  <aside class="absolute top-0 left-0 z-50 h-screen w-screen max-w-2xl items-center justify-center bg-base-1">
    <AppButton
      intent="default"
      shape="rounded"
      size="small"
      class="absolute top-0 right-0 m-4 flex aspect-square items-center justify-center bg-white p-4 shadow-md hover:bg-gray-200"
      :to="`/karte`"
      ><AppIcon size="small" name="ic:baseline-close"
    /></AppButton>
    <StolpersteinDetails :stolperstein-id="stolpersteinId"></StolpersteinDetails>
  </aside>
</template>

<script setup lang="ts">
// const router = useRouter();
// router.removeRoute;

const routeParams = toRef(useRoute(), "params");
const stolpersteinId = computed(() => {
  const stolpersteinIdParam = routeParams.value.stolpersteinId;
  if (typeof stolpersteinIdParam === "string") {
    const parsed = Number(stolpersteinIdParam);
    console.log("id", parsed);
    if (!isNaN(parsed)) return parsed;
  }
  return undefined;
});

onMounted(() => {
  console.log("onMounted");
});

onActivated(() => {
  console.log("onActivated");
});

// definePageMeta({
//   pageTransition: {
//     // enterActiveClass: "transform duration-300 ease-out",
//     // enterFromClass: "-translate-x-full",
//     // enterToClass: "translate-x-0",
//     // leaveActiveClass: "transform duration-300 ease",
//     // leaveFromClass: "translate-x-0",
//     // leaveToClass: "-translate-x-full",
//     mode: "out-in",
//   },
// });
</script>

<style scoped></style>
