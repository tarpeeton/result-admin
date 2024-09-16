import axios from 'axios';


// GET ALL REVIEWS
const getReviewsAll = async (lng) => {
  try {
    const res = await axios.get('/api/review', {
      // Set the Accept-Language header to the language of the reviews
      headers: {
        "Accept-Language": lng
      }
    });

    return res.data;
  } catch (error) {
    // Throw an error if the request fails
    throw new Error(error);
  }
};


// GET REVIEW WITH ID




// GET MAIN BANNER 

// export const getMainBanner = async (lng) => {
// 	try {
// 	  const res = await axios.get('/api/main-banner', {
// 		headers: {
// 		  "Accept-Language": lng
// 		}
// 	  });
// 	  // Return only the 'data' part of the response
// 	  return res.data.data;
// 	} catch (error) {
// 	  throw new Error(error);
// 	}
//   };

export const getMainBanner = async (lng) => {
	// Return fake data for testing
	return {
	  "message": "Test message",
	  "data": {
		"title": "Медицинский маркетинг IT решения",
		"subtitle": "Привлекаем клиентов для медицинского бизнеса",
		"background": {
		  "id": 1,
		  "url": "https://ucarecdn.com/ff86fa38-8ed3-4294-883c-8ec965cfd6f3/-/preview/1000x357/"
		},
		"photo": {
		  "id": 2,
		  "url": "https://ucarecdn.com/8ae2ac1e-8134-4659-8e98-0e9183c06409/-/preview/360x247/"
		}
	  }
	};
  };

  
  
  