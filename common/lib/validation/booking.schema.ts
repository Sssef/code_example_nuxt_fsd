import { z } from "zod";

export const bookingsSchema = z.object({
  seats: z
    .array(
      z.object({
        rowNumber: z.number().int().positive(),
        seatNumber: z.number().int().positive(),
      }),
    )
    .min(1, "Не переданы seats"),
});

export type BookingsDto = z.infer<typeof bookingsSchema>;
