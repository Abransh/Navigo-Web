// Backend/src/database/seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Logger } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/enums/user-role.enum';
import { Destination } from '../destinations/entities/destination.entity';
import * as bcrypt from 'bcrypt';

const logger = new Logger('Seed');

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    // Get repositories
    const userRepository = app.get('UserRepository') as Repository<User>;
    const destinationRepository = app.get('DestinationRepository') as Repository<Destination>;
    
    // Seed admin user
    await seedAdminUser(userRepository);
    
    // Seed destinations
    await seedDestinations(destinationRepository);
    
    logger.log('Seeding completed!');
  } catch (error) {
    logger.error('Error during seeding:', error);
  } finally {
    await app.close();
  }
}

async function seedAdminUser(userRepository: Repository<User>) {
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@navigo.com';
  
  // Check if admin already exists
  const existingAdmin = await userRepository.findOne({ where: { email: adminEmail } });
  if (existingAdmin) {
    logger.log('Admin user already exists');
    return;
  }
  
  // Create admin user
  const password = process.env.SEED_ADMIN_PASSWORD || 'admin_password';
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const adminUser = userRepository.create({
    firstName: 'Admin',
    lastName: 'User',
    email: adminEmail,
    password: hashedPassword,
    role: UserRole.ADMIN,
    isVerified: true,
    isActive: true,
  });
  
  await userRepository.save(adminUser);
  logger.log(`Admin user created: ${adminEmail}`);
}

async function seedDestinations(destinationRepository: Repository<Destination>) {
  // Check if destinations already exist
  const count = await destinationRepository.count();
  if (count > 0) {
    logger.log('Destinations already seeded');
    return;
  }
  
  // Sample destinations data
  const destinations = [
    {
      name: 'VARANASI',
      slug: 'varanasi',
      description: 'Varanasi, also known as Benares or Kashi, is one of the oldest continuously inhabited cities in the world. It is a major religious hub in India and is regarded as one of the seven holy cities in Hinduism.',
      image: '/images/Varanasi1.jpg',
      highlights: [
        'Witness the spiritual Ganga Aarti ceremony at Dashashwamedh Ghat',
        'Explore the ancient ghats along the River Ganges',
        'Visit the sacred Kashi Vishwanath Temple',
        'Experience sunrise boat ride on the Ganges',
      ],
      attractions: [
        {
          name: 'Dashashwamedh Ghat',
          description: 'The main ghat in Varanasi where the spectacular Ganga Aarti is performed every evening.',
          image: '/images/varanasi-dashashwamedh-ghat.jpg',
        },
        {
          name: 'Kashi Vishwanath Temple',
          description: 'One of the most famous Hindu temples dedicated to Lord Shiva, located on the western bank of the holy river Ganga.',
          image: '/images/varanasi-kashi-vishwanath.jpg',
        },
      ],
    },
    {
      name: 'GOA',
      slug: 'goa',
      description: 'Goa is a state on the southwestern coast of India within the region known as the Konkan. It is India\'s smallest state by area and the fourth-smallest by population, famous for its beaches, nightlife, and architecture.',
      image: '/images/Goa.jpg',
      highlights: [
        'Relax on beautiful beaches like Baga, Calangute, and Anjuna',
        'Explore Old Goa\'s Portuguese colonial architecture',
        'Experience vibrant nightlife and beach parties',
        'Try delicious Goan cuisine with fresh seafood',
      ],
      attractions: [
        {
          name: 'Calangute Beach',
          description: 'One of the largest and most popular beaches in North Goa, known as the "Queen of Beaches".',
          image: '/images/goa-calangute.jpg',
        },
        {
          name: 'Basilica of Bom Jesus',
          description: 'UNESCO World Heritage Site and one of the best examples of baroque architecture in India.',
          image: '/images/goa-basilica.jpg',
        },
      ],
    },
    {
      name: 'NEW DELHI',
      slug: 'new-delhi',
      description: 'New Delhi is the capital of India and a part of the National Capital Territory of Delhi. It houses important government buildings, embassies, and cultural institutions.',
      image: '/images/NewDelhi.jpg',
      highlights: [
        'Visit the iconic Red Fort, a UNESCO World Heritage Site',
        'Explore Humayun\'s Tomb and its beautiful gardens',
        'Experience the grandeur of Qutub Minar complex',
        'Shop at vibrant markets like Chandni Chowk',
      ],
      attractions: [
        {
          name: 'Red Fort',
          description: 'A historic fort that served as the main residence of the Mughal Emperors, built in 1639.',
          image: '/images/delhi-red-fort.jpg',
        },
        {
          name: 'India Gate',
          description: 'A war memorial dedicated to the soldiers of the British Indian Army who died in the First World War.',
          image: '/images/delhi-india-gate.jpg',
        },
      ],
    },
    {
      name: 'JAIPUR',
      slug: 'jaipur',
      description: 'Jaipur is the capital of the Indian state of Rajasthan, known as the "Pink City" due to the distinctive color of its buildings. It's part of the popular Golden Triangle tourist circuit.',
      image: '/images/Jaipur.jpg',
      highlights: [
        'Explore the magnificent Amber Fort',
        'Visit the City Palace complex',
        'See the unique Hawa Mahal (Palace of Winds)',
        'Experience traditional Rajasthani culture and cuisine',
      ],
      attractions: [
        {
          name: 'Amber Fort',
          description: 'A majestic fort overlooking Maota Lake, known for its artistic style elements and elaborate mirror work.',
          image: '/images/jaipur-amber-fort.jpg',
        },
        {
          name: 'Hawa Mahal',
          description: 'A palace with a unique five-story exterior that resembles a honeycomb with its 953 small windows.',
          image: '/images/jaipur-hawa-mahal.jpg',
        },
      ],
    },
  ];
  
  for (const destination of destinations) {
    await destinationRepository.save(destinationRepository.create(destination));
  }
  
  logger.log(`${destinations.length} destinations seeded successfully`);
}

bootstrap();