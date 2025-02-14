// center.js

// Ensure that the Firebase config (and therefore db) is loaded before this script
document.getElementById('centerForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Retrieve form data
    const school = document.getElementById('school').value;
    const studentCount = parseInt(document.getElementById('studentCount').value, 10);
    const arrival = document.getElementById('arrival').checked;
    const departure = document.getElementById('departure').checked;
    const timestamp = new Date(); // capture current date/time
  
    // Basic validation
    if (!school || isNaN(studentCount) || studentCount <= 0) {
      alert('Please fill in all required fields correctly.');
      return;
    }
  
    // Save data to Firestore
    db.collection("accommodationData").add({
      school: school,
      studentCount: studentCount,
      arrival: arrival,
      departure: departure,
      timestamp: timestamp
    })
    .then(() => {
      alert('Data submitted successfully!');
      document.getElementById('centerForm').reset();
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
      alert('Error submitting data. Please try again.');
    });
  });
  