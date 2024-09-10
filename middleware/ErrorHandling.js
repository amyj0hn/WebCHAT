import { stringify } from "flatted";

function errorHandling(err, req, res, next) {
    // Check if there's an error or the response status code is >= 400
    if (err || res.statusCode >= 400) {
        // Prepare the error details and avoid circular reference issues
        const errorDetails = {
            status: err?.status || res.statusCode || 500, // Use the error status or response status code, or default to 500
            error: stringify(err), // Handle circular references safely using flatted
        };

        // Send the JSON response with error details
        return res.status(errorDetails.status).json(errorDetails);
    }

    // If no error, pass the request to the next middleware
    next();
}  
export { 
    errorHandling
}