import prisma from './config/db.js';
async function run() {
  const p = await prisma.plan.findUnique({ where: { id: 30 }, include: { participants: true }});
  console.log(p);
}
run();
