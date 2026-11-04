// seed_2.js

require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.DB_NAME || "portfolio";

// Profile details
const profile = {
    name: "ABDULLA JAHAN",
    email: "abdullajahan2@gmail.com",
    mobile: "+91 7306015355",
    linkedin: "https://linkedin.com/in/abdulla-jahan",
    github: "https://github.com/j4han",
    portfolio: "https://j4han.github.io",
    objective:
        "Recent Bachelor of Computer Applications (BCA) graduate with a strong foundation in programming, databases, and statistics, seeking an apprenticeship at Google to apply analytical and problem-solving skills. Highly motivated to build a career in data analysis using SQL, Excel, and Python."
};

// Portfolio projects
const projects = [
    {
        name: "CNAV (Campus Navigation)",
        technologies: "Android, Java/Kotlin, QR Navigation, Firebase",
        description:
            "Led development of an Android campus navigation app to streamline indoor and campus transit, featuring QR code-based navigation, student information access, and instant notices.",
        github: "https://github.com/j4han"
    }
];

// Portfolio certificates
const certificates = [
    {
        name: "IBM Data Science Professional Certificate",
        organization: "Coursera",
        description:
            "Completed hands-on modules in practical data science methodologies, Python, SQL, and analytical data visualization tools (2025).",
        image: "ibm_datascience.png"
    }
];

// Education history
const education = [
    {
        degree: "Bachelor of Computer Applications (BCA)",
        institution: "University of Calicut",
        period: "2022–2025",
        score: "GPA: 6.6/10"
    },
    {
        degree: "12th Standard",
        institution: "Kerala Board",
        period: "2022",
        score: "Percentage: 84%"
    },
    {
        degree: "10th Standard",
        institution: "THSLC",
        period: "2020",
        score: "Grade: A+"
    }
];

// Insert data into MongoDB
async function seedDatabase() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB.");

        const db = client.db(dbName);

        // Update profile
        await db.collection("profile").deleteMany({});
        await db.collection("profile").insertOne(profile);

        // Update projects
        await db.collection("projects").deleteMany({});
        await db.collection("projects").insertMany(projects);

        // Update certificates
        await db.collection("certificates").deleteMany({});
        await db.collection("certificates").insertMany(certificates);

        // Update education
        await db.collection("education").deleteMany({});
        await db.collection("education").insertMany(education);

        console.log("Database seeded successfully!");
        console.log(`Database: ${dbName}`);
        console.log(`Projects added: ${projects.length}`);
        console.log(`Certificates added: ${certificates.length}`);
    } catch (error) {
        console.error("Error inserting data:", error);
        process.exitCode = 1;
    } finally {
        await client.close();
    }
}

seedDatabase();
