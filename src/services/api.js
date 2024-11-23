// make api calls here if needed

// amtracker api for simulating train data
export const fetchTrainData = async () => {
    try {
      const response = await fetch('https://api-v3.amtraker.com/v3/trains');
      if (!response.ok) {
        throw new Error('Network response issue');
      }
      const data = await response.json();
      return data;  // return fetched data
    } catch (error) {
      console.error('Error fetching train data:', error);
      throw error;  // re-throw error for handling 
    }
  };