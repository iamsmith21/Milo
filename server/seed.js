import "dotenv/config";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const seedData = [
  {
    title: "Weekend Hiking Trip",
    location: "Yosemite National Park",
    capacity: 10,
    category: "sport",
    confirmedPlayers: 4,
    hasJoined: true,
  },
  {
    title: "Board Game Night",
    location: "Downtown Cafe",
    capacity: 6,
    category: "social",
    confirmedPlayers: 6,
    hasJoined: false,
  },
  {
    title: "Local Hackathon",
    location: "Tech Hub Center",
    capacity: 50,
    category: "life",
    confirmedPlayers: 15,
    hasJoined: true,
  },
  {
    title: "Photography Walk",
    location: "City Center",
    capacity: 15,
    category: "life",
    confirmedPlayers: 8,
    hasJoined: false,
  },
  {
    title: "Morning Yoga Session",
    location: "Central Park",
    capacity: 20,
    category: "sport",
    confirmedPlayers: 12,
    hasJoined: true,
  }
];

async function main() {
  console.log(`Clearing existing plans...`);
  await prisma.plan.deleteMany({});
  
  console.log(`Start seeding...`);
  for (const p of seedData) {
    const plan = await prisma.plan.create({
      data: p,
    });
    console.log(`Created plan with id: ${plan.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
