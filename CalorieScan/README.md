# Food Calorie Scanner

A web application that allows users to scan QR codes or select dishes from a list to view detailed information about the calories and nutrition of food items.

## Features

- **QR Code Scanner**: Scan QR codes on food packaging to fetch dish details and nutrition.
- **Dish Selection**: Users can select dishes from a list and customize serving sizes to calculate total calories.
- **Calorie Calculation**: View the calories for individual items and the total calories for a dish.

## How to Use

1. **Start the App**: Upon loading the app, you will be presented with an option to scan a QR code or select a dish from a list.

2. **Scan a QR Code**: 
   - Press the "Scan" button to open the camera and scan the QR code.
   - Ensure that the QR code is formatted correctly to display the dish's information.

3. **Select a Dish from the List**:
   - Choose from a list of dishes (e.g., Idli Vada Combo, Veg Thaali).
   - The app will display nutritional information including calories per unit for each item in the dish.
   - Customize the number of servings by changing the quantity.

4. **View the Calories**: 
   - The app will show the total calories for the selected dish based on your input.

5. **Adjust the Units**:
   - For each item in the dish, you can adjust the quantity, and the app will automatically update the total calories accordingly.

## Calorie Information Sources

The calorie data is fetched from an external source containing nutritional information for various dishes. The following details are available:

- **Dish Name**
- **Description**
- **Item Nutritional Information**: Includes calories per unit and quantity.
- **Total Calories**: The total calorie count for the selected dish, based on the serving size.

## Technologies Used

- **React**: For building the user interface.
- **Axios**: For making HTTP requests to fetch dish data.
- **QR Scanner**: To scan QR codes and retrieve dish information.

## Setup Instructions

To run this project locally, follow these steps:

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/your-username/food-calorie-scanner.git
    ```

2. Navigate into the project folder:

    ```bash
    cd food-calorie-scanner
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Run the application:

    ```bash
    npm start
    ```

The app will be accessible at `http://localhost:3000`.

## Troubleshooting

- **Camera Access Issues**: Make sure that the browser has permission to access the camera for QR scanning.
- **QR Code Error**: If the QR code is not working, verify that it contains properly formatted JSON data.


