// Function to calculate Total Marks
function calculateTotalMarks(marks) {
    let total = 0;
    for (let subject in marks) {
        total += marks[subject];
    }
    return total;
}

// Function to calculate Percentage
function calculatePercentage(totalMarks, totalPossibleMarks) {
    return (totalMarks / totalPossibleMarks) * 100;
}

// Function to determine Grade based on Percentage
function calculateGrade(percentage) {
    if (percentage >= 80) {
        return 'A+';
    } else if (percentage >= 70) {
        return 'A';
    } else if (percentage >= 60) {
        return 'B';
    } else if (percentage >= 50) {
        return 'C';
    } else {
        return 'F';
    }
}

// Function to determine Pass/Fail Status (Fails if any subject score is under 40)
function determineStatus(marks) {
    for (let subject in marks) {
        if (marks[subject] < 40) {
            return 'Failed';
        }
    }
    return 'Passed';
}

// Main Function to generate and print Marksheet
function generateMarksheet(studentDetails, subjectMarks) {
    const totalPossibleMarks = 500;
    const totalObtained = calculateTotalMarks(subjectMarks);
    const percentage = calculatePercentage(totalObtained, totalPossibleMarks);
    const grade = calculateGrade(percentage);
    const status = determineStatus(subjectMarks);

    // Formatted Console Output
    console.log("==================================================");
    console.log("                STUDENT MARKSHEET                 ");
    console.log("==================================================");
    console.log(`Student Name   : ${studentDetails.name}`);
    console.log(`Student ID     : ${studentDetails.id}`);
    console.log(`Email Address  : ${studentDetails.email}`);
    console.log(`Contact Number : ${studentDetails.contact}`);
    console.log("--------------------------------------------------");
    console.log("SUBJECT MARKS (Out of 100):");
    console.log(`  English      : ${subjectMarks.english}`);
    console.log(`  Mathematics  : ${subjectMarks.maths}`);
    console.log(`  Science      : ${subjectMarks.science}`);
    console.log(`  Computer     : ${subjectMarks.computer}`);
    console.log(`  Urdu         : ${subjectMarks.urdu}`);
    console.log("--------------------------------------------------");
    console.log(`Total Marks    : ${totalObtained} / ${totalPossibleMarks}`);
    console.log(`Percentage     : ${percentage.toFixed(2)}%`);
    console.log(`Grade          : ${grade}`);
    console.log(`Status         : ${status}`);
    console.log("==================================================");
}

// --- Sample Data & Execution ---

const studentInformation = {
    name: "Muhammad Ali",
    id: "STU-2026-8941",
    email: "ali.m@example.com",
    contact: "+92 300 1234567"
};

const marksObtained = {
    english: 85,
    maths: 92,
    science: 78,
    computer: 88,
    urdu: 74
};

// Run the program
generateMarksheet(studentInformation, marksObtained);