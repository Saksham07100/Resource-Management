require("dotenv").config();
const mongoose = require("mongoose");
const Material = require("./models/Other/material.model");

const MONGODB_URI = process.env.MONGODB_URI;

const dummyMaterials = [
  // Data Structures
  {
    title: "Data Structures Mid-Sem Question Paper 2024",
    subject: "Data Structures",
    faculty: "Dr. Rajesh Sharma",
    link: "https://drive.google.com/file/d/sample-ds-midsem-2024/view",
    type: "question-paper",
  },
  {
    title: "Data Structures End-Sem Question Paper 2023",
    subject: "Data Structures",
    faculty: "Dr. Rajesh Sharma",
    link: "https://drive.google.com/file/d/sample-ds-endsem-2023/view",
    type: "question-paper",
  },
  {
    title: "Arrays and Linked Lists - Lecture Notes",
    subject: "Data Structures",
    faculty: "Dr. Rajesh Sharma",
    link: "https://drive.google.com/file/d/sample-ds-notes-unit1/view",
    type: "notes",
  },
  {
    title: "Trees and Graphs Assignment",
    subject: "Data Structures",
    faculty: "Dr. Rajesh Sharma",
    link: "https://drive.google.com/file/d/sample-ds-assignment-2/view",
    type: "assignment",
  },
  {
    title: "Sorting Algorithms Study Material",
    subject: "Data Structures",
    faculty: "Dr. Rajesh Sharma",
    link: "https://drive.google.com/file/d/sample-ds-sorting/view",
    type: "material",
  },
  
  // Operating Systems
  {
    title: "Operating Systems Mid-Sem Question Paper 2024",
    subject: "Operating Systems",
    faculty: "Prof. Priya Patel",
    link: "https://drive.google.com/file/d/sample-os-midsem-2024/view",
    type: "question-paper",
  },
  {
    title: "OS End-Sem Question Paper 2023",
    subject: "Operating Systems",
    faculty: "Prof. Priya Patel",
    link: "https://drive.google.com/file/d/sample-os-endsem-2023/view",
    type: "question-paper",
  },
  {
    title: "OS Previous Year Question Paper 2022",
    subject: "Operating Systems",
    faculty: "Prof. Priya Patel",
    link: "https://drive.google.com/file/d/sample-os-2022/view",
    type: "question-paper",
  },
  {
    title: "Process Management Study Material",
    subject: "Operating Systems",
    faculty: "Prof. Priya Patel",
    link: "https://drive.google.com/file/d/sample-os-process-mgmt/view",
    type: "material",
  },
  {
    title: "Memory Management - Complete Notes",
    subject: "Operating Systems",
    faculty: "Prof. Priya Patel",
    link: "https://drive.google.com/file/d/sample-os-memory-notes/view",
    type: "notes",
  },
  
  // Database Management
  {
    title: "DBMS Mid-Sem Question Paper 2024",
    subject: "Database Management",
    faculty: "Dr. Amit Verma",
    link: "https://drive.google.com/file/d/sample-dbms-midsem-2024/view",
    type: "question-paper",
  },
  {
    title: "DBMS End-Sem Question Paper 2023",
    subject: "Database Management",
    faculty: "Dr. Amit Verma",
    link: "https://drive.google.com/file/d/sample-dbms-endsem-2023/view",
    type: "question-paper",
  },
  {
    title: "SQL Query Practice Questions",
    subject: "Database Management",
    faculty: "Dr. Amit Verma",
    link: "https://drive.google.com/file/d/sample-dbms-sql-practice/view",
    type: "assignment",
  },
  {
    title: "Normalization & ER Diagrams Notes",
    subject: "Database Management",
    faculty: "Dr. Amit Verma",
    link: "https://drive.google.com/file/d/sample-dbms-normalization/view",
    type: "notes",
  },
  {
    title: "Transaction Management Study Guide",
    subject: "Database Management",
    faculty: "Dr. Amit Verma",
    link: "https://drive.google.com/file/d/sample-dbms-transactions/view",
    type: "material",
  },
  
  // Computer Networks
  {
    title: "Computer Networks Mid-Sem 2024",
    subject: "Computer Networks",
    faculty: "Prof. Vikram Rao",
    link: "https://drive.google.com/file/d/sample-cn-midsem-2024/view",
    type: "question-paper",
  },
  {
    title: "CN End-Sem Question Paper 2023",
    subject: "Computer Networks",
    faculty: "Prof. Vikram Rao",
    link: "https://drive.google.com/file/d/sample-cn-endsem-2023/view",
    type: "question-paper",
  },
  {
    title: "CN Previous Year Papers Collection 2020-2022",
    subject: "Computer Networks",
    faculty: "Prof. Vikram Rao",
    link: "https://drive.google.com/file/d/sample-cn-prev-years/view",
    type: "question-paper",
  },
  {
    title: "TCP/IP Protocol Suite Study Material",
    subject: "Computer Networks",
    faculty: "Prof. Vikram Rao",
    link: "https://drive.google.com/file/d/sample-cn-tcpip/view",
    type: "material",
  },
  {
    title: "Network Security Assignment",
    subject: "Computer Networks",
    faculty: "Prof. Vikram Rao",
    link: "https://drive.google.com/file/d/sample-cn-security-assign/view",
    type: "assignment",
  },
  
  // Software Engineering
  {
    title: "Software Engineering Mid-Sem 2024",
    subject: "Software Engineering",
    faculty: "Dr. Sneha Gupta",
    link: "https://drive.google.com/file/d/sample-se-midsem-2024/view",
    type: "question-paper",
  },
  {
    title: "Software Engineering End-Sem 2023",
    subject: "Software Engineering",
    faculty: "Dr. Sneha Gupta",
    link: "https://drive.google.com/file/d/sample-se-endsem-2023/view",
    type: "question-paper",
  },
  {
    title: "SDLC Models Complete Notes",
    subject: "Software Engineering",
    faculty: "Dr. Sneha Gupta",
    link: "https://drive.google.com/file/d/sample-se-sdlc-notes/view",
    type: "notes",
  },
  {
    title: "UML Diagrams Study Material",
    subject: "Software Engineering",
    faculty: "Dr. Sneha Gupta",
    link: "https://drive.google.com/file/d/sample-se-uml/view",
    type: "material",
  },
];

async function seedMaterials() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check if materials already exist
    const existingMaterials = await Material.find({ type: "question-paper" });
    
    if (existingMaterials.length > 0) {
      console.log(`Found ${existingMaterials.length} existing materials. Skipping seed.`);
      console.log("If you want to add sample data, delete existing materials first.");
    } else {
      // Insert dummy materials
      await Material.insertMany(dummyMaterials);
      console.log(`✅ Successfully added ${dummyMaterials.length} sample materials!`);
      console.log("\nAdded materials include:");
      console.log("- Question Papers for Data Structures, OS, DBMS, CN, SE");
      console.log("- Study Notes and Materials");
      console.log("- Assignments");
    }

    await mongoose.connection.close();
    console.log("\nDatabase connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding materials:", error);
    process.exit(1);
  }
}

seedMaterials();
