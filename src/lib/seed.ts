import { sequelize } from '../config/db';
import { userProvider } from '../providers';
import { USERNAME, PASSWORD } from '../middleware/auth.middleware';

/**
 * Seeds the database by synchronizing models, creating a user, and logging the result.
 *
 * @async
 * @function seed
 * @returns void
 */
export async function seed() {
    try {
        await sequelize.sync({ force: true }); // Drops existing tables and re-creates them

        const userData = { username: USERNAME, password: PASSWORD };
        await userProvider.createUser(userData);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
}
