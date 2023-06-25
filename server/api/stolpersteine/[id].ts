import { StolpersteinFeature } from "~/models/stolperstein.model";

export default defineEventHandler((event): StolpersteinFeature => {
  const id = parseInt(event.context.params?.id ?? "") as number;
  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id should be an integer",
    });
  }

  const stolpersteine = getStolpersteine();
  const stolperstein = findStolpersteinById(id, stolpersteine);
  if (stolperstein) {
    return stolperstein;
  }

  throw createError({
    statusCode: 404,
    statusMessage: `Stolperstein with Id ${id} could not be found`,
  });
});
