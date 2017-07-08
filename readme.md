# Terra
Want awesome backgrounds for your desktop? Terra hits reddit's APIs to download the top images from https://www.reddit.com/r/EarthPorn/ for the day and lets you manage your gallery.

## Getting Started
1. Clone this project
2. Install Python 3
3. `pip install flask requests` to download the backend packages
4. `npm install` or `yarn` to download the frontend packages
5. `npm run build` to build the frontend assets
6. Run with `flask run`
7. Navigate to `localhost:5000`

## Notes
*This project is a work in progress - expect it to be broken or not fully functional at times.*
- Currently supports Windows. OS X and Linux are not currently supported, but this may change in the future.

## Known Issues
- If an image is not linked to directly, Terra will not download or display it properly.
