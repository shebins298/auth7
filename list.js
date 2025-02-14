// list.js

// Define the list of all schools (adjust this array as needed)
const allSchools = [
    "SH HSS",
    "PANANGAD VHSS",
    "SN HSS",
    "HSS OF JESUS",
  ];
  
  // Function to fetch and display the latest entries per school
  function fetchLatestEntries() {
    db.collection("accommodationData")
      .orderBy("timestamp", "desc") // Order by timestamp descending so the first record is the latest
      .get()
      .then(querySnapshot => {
        // Use a Map to store the first (latest) record per school
        const latestRecords = new Map();
  
        querySnapshot.forEach(doc => {
          const data = doc.data();
          const school = data.school;
          // If this school is not already added, add it (first record is the latest because of the ordering)
          if (!latestRecords.has(school)) {
            latestRecords.set(school, data);
          }
        });
  
        // Display the latest entries in the table
        displayLatestEntries(latestRecords);
        // Display pending schools that haven't submitted data
        displayPendingSchools(latestRecords);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }
  
  // Function to display latest entries in the table
  function displayLatestEntries(latestRecords) {
    const tbody = document.getElementById('latestTable').querySelector('tbody');
    tbody.innerHTML = ""; // Clear previous entries
  
    latestRecords.forEach((data, school) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${school}</td>
        <td>${data.studentCount}</td>
        <td>${data.arrival ? "Yes" : "No"}</td>
        <td>${data.departure ? "Yes" : "No"}</td>
      `;
      tbody.appendChild(tr);
    });
  }
  
  // Function to display pending schools (schools with no data entry)
  function displayPendingSchools(latestRecords) {
    const pendingList = document.getElementById('pendingList');
    pendingList.innerHTML = ""; // Clear existing list
  
    // Get the schools that have submitted data
    const submittedSchools = Array.from(latestRecords.keys());
    
    // Filter out the schools that have data from allSchools array
    const pendingSchools = allSchools.filter(school => !submittedSchools.includes(school));
  
    if (pendingSchools.length === 0) {
      pendingList.innerHTML = "<li>All schools have submitted data.</li>";
    } else {
      pendingSchools.forEach(school => {
        const li = document.createElement('li');
        li.textContent = school;
        pendingList.appendChild(li);
      });
    }
  }
  
  // Call the function to fetch data when the page loads
  fetchLatestEntries();
  