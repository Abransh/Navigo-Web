// Backend/src/seeds/destination.seed.ts
import { Destination } from '../destinations/entities/destination.entity';
import { getRepository } from 'typeorm';

export const seedDestinations = async () => {
  const destinationRepository = getRepository(Destination);
  
  // Check if destinations already exist
  const count = await destinationRepository.count();
  if (count > 0) {
    console.log('Destinations already seeded');
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
    // Add more destinations as needed
  ];
  
  for (const destination of destinations) {
    await destinationRepository.save(destinationRepository.create(destination));
  }
  
  console.log('Destinations seeded successfully');
};