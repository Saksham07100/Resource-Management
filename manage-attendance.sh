#!/bin/bash

# Attendance Management Script
# This script helps manage attendance demo data

echo "======================================"
echo "  Attendance Data Management Script  "
echo "======================================"
echo ""

show_menu() {
    echo "Select an option:"
    echo "1. Seed demo attendance data"
    echo "2. Clear all attendance data"
    echo "3. Clear and reseed attendance data"
    echo "4. View attendance statistics"
    echo "5. Exit"
    echo ""
}

seed_data() {
    echo "🌱 Seeding demo attendance data..."
    cd backend
    node seedAttendance.js
    cd ..
}

clear_data() {
    echo "🗑️  Clearing attendance data..."
    cd backend
    node clearAttendance.js
    cd ..
}

clear_and_reseed() {
    echo "🔄 Clearing and reseeding attendance data..."
    cd backend
    node clearAttendance.js && node seedAttendance.js
    cd ..
}

view_stats() {
    echo "📊 Viewing attendance statistics..."
    cd backend
    node -e "
    require('dotenv').config();
    const mongoose = require('mongoose');
    const Attendance = require('./models/Other/attendance.model');
    
    mongoose.connect(process.env.MONGODB_URI).then(async () => {
        const records = await Attendance.find({});
        console.log('\n=== Attendance Statistics ===');
        console.log('Total Records:', records.length);
        
        const byStudent = {};
        records.forEach(r => {
            if (!byStudent[r.enrollmentNo]) byStudent[r.enrollmentNo] = [];
            byStudent[r.enrollmentNo].push(r);
        });
        
        console.log('\nBy Student:');
        Object.keys(byStudent).forEach(enrollmentNo => {
            console.log(\`  Student \${enrollmentNo}: \${byStudent[enrollmentNo].length} subjects\`);
            byStudent[enrollmentNo].forEach(r => {
                console.log(\`    - \${r.subject}: \${r.percentage}%\`);
            });
        });
        
        await mongoose.connection.close();
        process.exit(0);
    });
    "
    cd ..
}

# Main loop
while true; do
    show_menu
    read -p "Enter your choice (1-5): " choice
    
    case $choice in
        1)
            seed_data
            ;;
        2)
            clear_data
            ;;
        3)
            clear_and_reseed
            ;;
        4)
            view_stats
            ;;
        5)
            echo "👋 Goodbye!"
            exit 0
            ;;
        *)
            echo "❌ Invalid option. Please try again."
            ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
    clear
done
