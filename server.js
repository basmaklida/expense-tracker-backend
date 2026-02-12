require("dotenv").config();
const app = require("./src/app");
// 1. Import the database hub we created
const models = require("./src/models");
console.log("Checking exported models:", models);
const { sequelize } = models; 

const PORT = process.env.PORT || 5000;

// 2. Connect to the database and Sync tables BEFORE starting the server
sequelize.sync({ alter: true }) // 'alter' updates your tables to match your new models without deleting data
  .then(() => {
    console.log("✅ Database synced successfully!");
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });