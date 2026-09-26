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
    time: "08:00 AM",
    date: "2026-10-15",
    description: "Join us for a beautiful morning hike through the valley. Bring water and snacks!"
  },
  {
    title: "Board Game Night",
    location: "Downtown Cafe",
    capacity: 6,
    category: "social",
    confirmedPlayers: 6,
    hasJoined: false,
    time: "07:00 PM",
    date: "2026-10-20",
    description: "Catan, Ticket to Ride, and more! First drinks on me."
  },
  {
    title: "Local Hackathon",
    location: "Tech Hub Center",
    capacity: 50,
    category: "life",
    confirmedPlayers: 15,
    hasJoined: true,
    time: "09:00 AM",
    date: "2026-11-01",
    description: "24 hours of coding, pizza, and building cool things. All skill levels welcome."
  },
  {
    title: "Photography Walk",
    location: "City Center",
    capacity: 15,
    category: "life",
    confirmedPlayers: 8,
    hasJoined: false,
    time: "04:30 PM",
    date: "2026-10-25",
    description: "Golden hour photography walk. Bring your DSLR or just your phone!"
  },
  {
    title: "Morning Yoga Session",
    location: "Central Park",
    capacity: 20,
    category: "sport",
    confirmedPlayers: 12,
    hasJoined: true,
    time: "07:30 AM",
    date: "2026-10-12",
    description: "Start your day with a relaxing Vinyasa flow. Don't forget your mat."
  },
  {
    title: "Sunset Volleyball",
    location: "South Beach",
    capacity: 12,
    category: "sport",
    confirmedPlayers: 8,
    hasJoined: false,
    time: "05:00 PM",
    date: "2026-10-18",
    description: "Casual 6v6 beach volleyball. All skill levels welcome!"
  },
  {
    title: "Indie Coffee Tasting",
    location: "Bean & Brew",
    capacity: 8,
    category: "social",
    confirmedPlayers: 3,
    hasJoined: true,
    time: "10:00 AM",
    date: "2026-11-05",
    description: "Tasting 5 different single-origin roasts."
  },
  {
    title: "Pottery Workshop",
    location: "Clay Studio",
    capacity: 10,
    category: "life",
    confirmedPlayers: 10,
    hasJoined: false,
    time: "01:00 PM",
    date: "2026-10-22",
    description: "Learn the basics of wheel throwing. Materials provided."
  },
  {
    title: "Pickup Basketball",
    location: "North Rec Center",
    capacity: 15,
    category: "sport",
    confirmedPlayers: 9,
    hasJoined: true,
    time: "06:00 PM",
    date: "2026-10-14",
    description: "Running full court 5v5s."
  },
  {
    title: "Book Club: Sci-Fi",
    location: "Public Library",
    capacity: 12,
    category: "social",
    confirmedPlayers: 5,
    hasJoined: false,
    time: "06:30 PM",
    date: "2026-11-10",
    description: "Discussing 'Dune' this month. Come even if you haven't finished!"
  },
  {
    title: "Farmers Market Run",
    location: "Town Square",
    capacity: 5,
    category: "life",
    confirmedPlayers: 2,
    hasJoined: true,
    time: "09:00 AM",
    date: "2026-10-17",
    description: "Grabbing fresh produce and pastries."
  },
  {
    title: "Bouldering Session",
    location: "ClimbIt Gym",
    capacity: 8,
    category: "sport",
    confirmedPlayers: 4,
    hasJoined: false,
    time: "05:30 PM",
    date: "2026-10-19",
    description: "Evening bouldering. I have a guest pass if anyone needs one!"
  },
  {
    title: "Jazz Night",
    location: "The Blue Room",
    capacity: 6,
    category: "social",
    confirmedPlayers: 6,
    hasJoined: true,
    time: "08:00 PM",
    date: "2026-10-24",
    description: "Live local jazz band playing tonight."
  },
  {
    title: "Resume Review Workshop",
    location: "Student Union",
    capacity: 20,
    category: "life",
    confirmedPlayers: 14,
    hasJoined: false,
    time: "04:00 PM",
    date: "2026-10-28",
    description: "Peer-to-peer resume reviews. Bring a printed copy!"
  },
  {
    title: "Spikeball Tournament",
    location: "Campus Quad",
    capacity: 16,
    category: "sport",
    confirmedPlayers: 12,
    hasJoined: true,
    time: "02:00 PM",
    date: "2026-11-02",
    description: "Round robin spikeball. Winner gets bragging rights."
  }
];

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: "deep.smith100@gmail.com" }
  });

  if (!user) {
    console.error("User deep.smith100@gmail.com not found. Please sign up first.");
    process.exit(1);
  }

  console.log(`Clearing existing plans...`);
  await prisma.plan.deleteMany({});
  
  console.log(`Start seeding...`);
  for (const p of seedData) {
    const plan = await prisma.plan.create({
      data: {
        ...p,
        authorId: user.id
      },
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
