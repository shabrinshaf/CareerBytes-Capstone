import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import passport from './config/passport';
import authRoutes from './routes/authRoutes';
import trendingSkillsRoutes from './routes/trendingSkillsRoutes';
import skillAssessmentRoutes from './routes/skillAssessmentRoutes';

import careerRoadmapRoutes from './routes/careerRoadmapRoutes';
import rolesRoutes from './routes/rolesRoutes';
import dailyMissionRoutes from './routes/dailyMissionRoutes';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize()); // Tanpa passport.session() karena JWT

//setup Swagger UI untuk dokumentasi API
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);
app.use('/api/trending-skills', trendingSkillsRoutes);
app.use('/api/skill-assessment', skillAssessmentRoutes);
app.use('/api/career-roadmap', careerRoadmapRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/daily-mission', dailyMissionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
