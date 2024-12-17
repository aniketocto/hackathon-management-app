export function formatDate(inputDate) {
    const months = [
        "January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October",
        "November", "December"
    ];

    const date = new Date(inputDate);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
}

// Function to get formatted date in 'YYYY-MM-DD' format
export function getformatDate(date) {
    // Extract year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
  
    // Format into 'YYYY-MM-DD'
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  }
  