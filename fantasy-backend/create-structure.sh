#!/bin/bash

echo "🚀 Creating Fantasy Backend Folder Structure..."

# Root src folder
mkdir -p src

# Core folders
mkdir -p src/config
mkdir -p src/models
mkdir -p src/routes
mkdir -p src/controllers
mkdir -p src/middlewares
mkdir -p src/services
mkdir -p src/jobs
mkdir -p src/utils
mkdir -p src/validations

# Config files
touch src/config/db.ts
touch src/config/env.ts

# App bootstrap
touch src/app.ts
touch src/server.ts

# Models
touch src/models/User.model.ts
touch src/models/Wallet.model.ts
touch src/models/Transaction.model.ts
touch src/models/Match.model.ts
touch src/models/Contest.model.ts
touch src/models/Prediction.model.ts
touch src/models/UserPrediction.model.ts
touch src/models/Result.model.ts

# Controllers
touch src/controllers/auth.controller.ts
touch src/controllers/user.controller.ts
touch src/controllers/contest.controller.ts
touch src/controllers/prediction.controller.ts
touch src/controllers/wallet.controller.ts

# Routes
touch src/routes/auth.routes.ts
touch src/routes/user.routes.ts
touch src/routes/contest.routes.ts
touch src/routes/prediction.routes.ts
touch src/routes/wallet.routes.ts

# Middlewares
touch src/middlewares/auth.middleware.ts
touch src/middlewares/error.middleware.ts
touch src/middlewares/validate.middleware.ts

# Services
touch src/services/googleAuth.service.ts
touch src/services/wallet.service.ts
touch src/services/ai.service.ts

# Jobs (cron / background)
touch src/jobs/lockContest.job.ts
touch src/jobs/resultCalculation.job.ts

# Utils
touch src/utils/ApiError.ts
touch src/utils/ApiResponse.ts

# Validation schemas
touch src/validations/auth.validation.ts
touch src/validations/contest.validation.ts
touch src/validations/prediction.validation.ts

echo "✅ Folder structure created successfully!"
