import { sequelize } from '../config/db';
import { seedProvider } from '../providers';

export async function seed() {
    try {
        await sequelize.sync({ force: true }); // Drops existing tables and re-creates them

        const usersData = [{ username: 'admin', password: 'admin' }];
        await seedProvider.createUsers(usersData);

        const librariesData = [
            {
                name: 'Test Library',
                location: 'av. Argentina 1000',
                phone: '123-123-123'
            }
        ];
        await seedProvider.createLibraries(librariesData);

        const booksData = [
            {
                title: 'The Lord of the Rings - The fellowship of the ring',
                author: 'J. R. R. Tolkien',
                year: '1954'
            }
        ];
        await seedProvider.createBooks(booksData);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
}
