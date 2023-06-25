import { StolpersteinFeature } from "~/models/stolperstein.model";

export const useCurrentStolperstein = () =>
  useState<StolpersteinFeature | undefined>("current-stolperstein", () => undefined);
