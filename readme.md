# Terra
Want awesome backgrounds for your desktop? Terra hits reddit's APIs to get the top images from https://www.reddit.com/r/EarthPorn/ for the day and downloads them to your gallery.

## Getting Started
1. Clone this project
2. Install Python 3
3. `pip install flask requests` to download the backend packages
4. `npm install` or `yarn` to download the frontend packages
5. `npm run build` to build the frontend assets
6. `flask run` to start the server
7. Navigate to `localhost:5000`

## Notes
*This project is a work in progress - expect it to be broken or not fully functional at times.*
- Currently supports Windows. At this time, OS X and Linux are not supported.

## Known Issues
- If an image is not linked to directly, Terra will not download or display it properly.
