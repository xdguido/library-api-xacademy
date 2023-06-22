import { sequelize } from '../config/db';
import { User } from '../models';

export async function seed() {
    try {
        await sequelize.sync({ force: true }); // Drops existing tables and re-creates them

        const usersData = [
            { id: 1, firstName: 'John', lastName: 'Doe' },
            { id: 2, firstName: 'Jane', lastName: 'Doe' }
        ];

        await Promise.all(usersData.map((userData) => User.create(userData)));

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
    // finally {
    //     await sequelize.close(); // Close the database connection
    // }
}
