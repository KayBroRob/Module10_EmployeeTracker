import express from 'express';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';
import inquirer from 'inquirer';

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

async function mainMenu(): Promise<void> {
    try {
        const { choose } = await inquirer.prompt<{ choose: string}>({
            type: 'list',
            name: 'choose',
            message: 'Please select one of the following options',
            choose: [
                'View Departments',
                'View Roles',
                'View Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Role',
                'Exit',
            ],
        });
        switch (choose) {
            case 'View Departments':
                await viewDepartments();
                break;
            case 'View Roles':
                await viewRoles();
                break;
            case 'View Employees':
                await viewEmployees();
                break;
            case 'Add Department':
                await addDepartment();
                break;
            case 'Add Role':
                await addRole();
                break;
            case 'Add Employee':
                await addEmployee();
                break;
            case 'Update Role':
                await updateRole();
                break;
            case 'Exit':
                console.log('Exiting Now');
                await pool.end();
                process.exit(0);
            default:
                console.log('Invalid. Try again');
        }
    } catch (error: any) {
        if (error.isTtyError) {
            console.error("Could not complete command");
        } else {
            console.error("Error", error);
        }
    } finally {
        if (process.exitCode === undefined || process.exitCode === null || process.exitCode === 0) {
            if (choice !== 'Exit') {
                mainMenu();
            }
        }
    }
}


app.use((_req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});