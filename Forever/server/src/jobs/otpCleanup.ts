import cron from "node-cron";
import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";

cron.schedule("* * * * *", async () => {
  try {
    const expiryTime = new Date(Date.now() - 5 * 60 * 1000);

    await prisma.otp.deleteMany({
      where: {
        createdAt: {
          lt: expiryTime,
        },
      },
    });
  } catch (error) {
    console.error("Error in otp cleanup job", error);
  }
});
