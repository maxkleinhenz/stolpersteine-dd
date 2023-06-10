import { defineStore } from "pinia";

export const usePositionStore = defineStore("position", () => {
  const { coords, locatedAt, error, resume, pause } = useGeolocation({
    timeout: 30000, // 30 sec
    maximumAge: 60 * 1000, //1 min
  });

  const followPosition = ref<boolean>();
  const watchActiv = ref<boolean>();

  async function startWatch() {
    resume();
    followPosition.value = true;
    watchActiv.value = true;
  }

  async function pauseWatch() {
    pause();
    followPosition.value = false;
    watchActiv.value = false;
  }

  function toggleWatch() {
    if (watchActiv.value) pauseWatch();
    else startWatch();
  }

  // watchEffect(() => {
  //   if (error.value) {
  //     console.log("error", error.value);
  //     pauseWatch();
  //   }
  // });

  return { position: coords, followPosition, watchActiv, startWatch, pauseWatch, toggleWatch };
});
