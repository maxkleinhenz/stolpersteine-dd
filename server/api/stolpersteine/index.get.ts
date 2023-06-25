import { StolpersteinFeature } from "~/models/stolperstein.model";

export default defineEventHandler((): StolpersteinFeature[] => {
  const stolpersteine = getStolpersteine();
  return stolpersteine;
});
