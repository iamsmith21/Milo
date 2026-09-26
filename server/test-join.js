import prisma from './config/db.js';
async function run() {
  try {
     const plan = await prisma.plan.findFirst();
     const user = await prisma.user.findFirst();
     if (!plan || !user) return console.log("Missing data");
     
     await prisma.planParticipant.create({
       data: { planId: plan.id, userId: user.id }
     });
     console.log("Create participant success");
     
     await prisma.plan.update({
       where: { id: plan.id },
       data: { confirmedPlayers: { increment: 1 } }
     });
     console.log("Update plan success");
  } catch (e) {
     console.error(e.message);
  }
}
run();
