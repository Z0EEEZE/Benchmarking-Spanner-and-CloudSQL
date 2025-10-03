const axios = require('axios');

// --- CONFIGURATION ---
const BASE_URL = process.argv[2]; // Get URL from command line e.g., http://34.12.34.56
if (!BASE_URL) {
    console.error("Please provide the application's external IP as an argument.");
    console.error("Example: node test-latency.js http://34.90.130.211");
    process.exit(1);
}

const PRODUCT_IDS_TO_READ = ['1', '2', '3']; // 3 Read operations
const ORDER_TO_UPDATE = { // 1 Write operation
    id: '45821',
    newQuantity: 5
};
const ITERATIONS = 10; // Number of times to run the test to get an average

// --- TEST FUNCTIONS ---
const getProduct = async (productId) => {
    const url = `${BASE_URL}/products/${productId}`;
    const response = await axios.get(url);
    return response.data;
};

const updateOrder = async (orderId, quantity) => {
    const url = `${BASE_URL}/orders/${orderId}`;
    const response = await axios.put(url, { quantity });
    return response.data;
};

// --- MAIN EXECUTION ---
const runTestCycle = async () => {
    console.time("Transaction");

    // Perform 3 reads
    await getProduct(PRODUCT_IDS_TO_READ[0]);
    await getProduct(PRODUCT_IDS_TO_READ[1]);
    await getProduct(PRODUCT_IDS_TO_READ[2]);

    // Perform 1 write
    await updateOrder(ORDER_TO_UPDATE.id, ORDER_TO_UPDATE.newQuantity);

    const elapsed = console.timeEnd("Transaction");
    return elapsed; // Note: console.timeEnd returns undefined, this is illustrative. The log is what matters.
};

const main = async () => {
    console.log(`\n--- Starting Latency Test on ${BASE_URL} ---`);
    console.log(`--- Performing a user journey (3 reads, 1 write) ${ITERATIONS} times. ---\n`);

    // Warm-up run to avoid cold start issues
    console.log("Performing one warm-up run...");
    await runTestCycle();
    console.log("Warm-up complete.\n");

    for (let i = 1; i <= ITERATIONS; i++) {
        process.stdout.write(`Running iteration ${i}/${ITERATIONS}... `);
        await runTestCycle();
    }
    
    console.log("\n--- Test Complete ---");
};

main().catch(err => {
    console.error("\nAn error occurred during the test:", err.message);
    if (err.response) {
        console.error("Response Status:", err.response.status);
        console.error("Response Data:", err.response.data);
    }
});
